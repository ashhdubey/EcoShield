# --- Build Stage ---
# We use a Maven image based on Eclipse Temurin (the modern standard for Java)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build the application skipping tests to save time
RUN mvn clean package -DskipTests

# --- Run Stage ---
# We use a lightweight JRE image to run the app
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]