from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    CategoryViewSet,
    ProductViewSet,
    ProductReviewViewSet,
    BrandViewSet,
    FAQCategoryViewSet,
    FAQQuestionViewSet,
    SearchView,
    SiteSettingsView,
    MainBannerViewSet,
    CartViewSet,
    ShareCartViewSet,
    FavoriteViewSet,
    LeadRequestViewSet,
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
router.register("favorites", FavoriteViewSet, basename="favorites")
router.register("leads", LeadRequestViewSet, basename="lead")
router.register("delivery-methods", DeliveryMethodViewSet, basename="delivery-method")
router.register("payment-methods", PaymentMethodViewSet, basename="payment-method")
router.register("orders", OrderViewSet, basename="order")
router.register("main-banners", MainBannerViewSet, basename="main-banner")

urlpatterns = [
    path("search/", SearchView.as_view()),
    path("site-settings/", SiteSettingsView.as_view()),
] + router.urls
