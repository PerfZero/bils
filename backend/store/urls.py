from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, BrandViewSet, FAQCategoryViewSet, FAQQuestionViewSet

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("brands", BrandViewSet, basename="brand")
router.register("faq-categories", FAQCategoryViewSet, basename="faq-category")
router.register("faq-questions", FAQQuestionViewSet, basename="faq-question")

urlpatterns = router.urls
