FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /TestApp
COPY . .
RUN mvn clean package -DskipTests
CMD mvn spring-boot:run
