from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ProductViewSet,
    ProductReviewViewSet,
    BrandViewSet,
    FAQCategoryViewSet,
    FAQQuestionViewSet,
    CartViewSet,
    ShareCartViewSet,
    DeliveryMethodViewSet,
    PaymentMethodViewSet,
    OrderViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("reviews", ProductReviewViewSet, basename="review")
router.register("brands", BrandViewSet, basename="brand")
router.register("faq-categories", FAQCategoryViewSet, basename="faq-category")
router.register("faq-questions", FAQQuestionViewSet, basename="faq-question")
router.register("cart", CartViewSet, basename="cart")
router.register("share-cart", ShareCartViewSet, basename="share-cart")
router.register("delivery-methods", DeliveryMethodViewSet, basename="delivery-method")
router.register("payment-methods", PaymentMethodViewSet, basename="payment-method")
router.register("orders", OrderViewSet, basename="order")

urlpatterns = router.urls
