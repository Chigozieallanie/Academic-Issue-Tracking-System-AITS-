from rest_framework import generics, status, viewsets
from .models import Issue, Student, CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import IssueSerializer,RegisterSerializer,LoginSerializer, UserSerializer, StudentProfileSerializer
from .permissions import IsOwnerOrReadOnly, IsRole

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsRole(['registrar'])]

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsOwnerOrReadOnly | IsRole(['registrar'])]

    def perform_create(self, serializer):
        if self.request.user.role == 'registrar':
            serializer.save()
        else:
            serializer.save(user=self.request.user)

class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class IssueRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
