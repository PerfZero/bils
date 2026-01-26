from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from store.models import Category, Product, PromoCode


class CartApiTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Test Category",
            slug="test-category",
        )
        self.product_one = Product.objects.create(
            category=self.category,
            name="Product One",
            slug="product-one",
            price=Decimal("100.00"),
        )
        self.product_two = Product.objects.create(
            category=self.category,
            name="Product Two",
            slug="product-two",
            price=Decimal("50.00"),
        )

    def _create_cart(self):
        response = self.client.post("/api/cart/")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        token = response.data.get("token")
        self.assertTrue(token)
        return token

    def _add_item(self, token, product_id, quantity=1):
        return self.client.post(
            f"/api/cart/{token}/items/",
            {"product_id": product_id, "quantity": quantity},
            format="json",
        )

    def test_add_items_and_totals(self):
        token = self._create_cart()

        response = self._add_item(token, self.product_one.id, quantity=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self._add_item(token, self.product_one.id, quantity=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self._add_item(token, self.product_two.id, quantity=3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        cart = response.data
        self.assertEqual(cart["total_quantity"], 5)
        self.assertEqual(len(cart["items"]), 2)

        items = {item["product_id"]: item for item in cart["items"]}
        self.assertEqual(items[self.product_one.id]["quantity"], 2)
        self.assertEqual(items[self.product_two.id]["quantity"], 3)

    def test_update_item_quantity_put(self):
        token = self._create_cart()
        response = self._add_item(token, self.product_one.id, quantity=2)
        item_id = response.data["items"][0]["id"]

        response = self.client.put(
            f"/api/cart/{token}/items/{item_id}/",
            {"quantity": 1},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["items"][0]["quantity"], 1)

    def test_update_item_quantity_patch(self):
        token = self._create_cart()
        response = self._add_item(token, self.product_one.id, quantity=2)
        item_id = response.data["items"][0]["id"]

        response = self.client.patch(
            f"/api/cart/{token}/items/{item_id}/",
            {"quantity": 3},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["items"][0]["quantity"], 3)

    def test_remove_item(self):
        token = self._create_cart()
        response = self._add_item(token, self.product_one.id, quantity=1)
        item_id = response.data["items"][0]["id"]

        response = self.client.delete(
            f"/api/cart/{token}/items/{item_id}/remove/"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["total_quantity"], 0)
        self.assertEqual(len(response.data["items"]), 0)

    def test_apply_promo_code(self):
        token = self._create_cart()
        self._add_item(token, self.product_one.id, quantity=2)
        PromoCode.objects.create(
            code="SALE10",
            discount_type=PromoCode.TYPE_PERCENT,
            discount_value=Decimal("10.00"),
            min_total=Decimal("0.00"),
        )

        response = self.client.post(
            f"/api/cart/{token}/promo/",
            {"code": "SALE10"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["promo_code"], "SALE10")
        self.assertEqual(str(response.data["promo_discount"]), "20.00")
        self.assertEqual(str(response.data["total_due"]), "180.00")
