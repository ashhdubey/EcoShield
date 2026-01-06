-- Location: server/src/main/resources/data.sql

-- Clear all old suggestions first to avoid conflicts
DELETE FROM suggestions;

-- Insert new, categorized suggestions specifying ALL columns explicitly
-- *** FIX: Changed NULL to 'ANY' for the 'applicable_grade' column in all inserts ***

-- --- GENERAL TIPS (Apply to everyone) ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('GENERAL_TIP', 'Stay hydrated by drinking plenty of water throughout the day, regardless of the weather.', 'GENERAL_HYDRATE', NULL, NULL, NULL, NULL, 'ANY', NULL, NULL, false, NULL, NULL),
('GENERAL_TIP', 'Check your EcoShield grade daily to plan your outdoor activities safely.', 'GENERAL_CHECK_APP', NULL, NULL, NULL, NULL, 'ANY', NULL, NULL, false, NULL, NULL);

-- --- UV TIPS (Based on UV Index) ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('UV_TIP', 'Low UV. You can safely enjoy the outdoors. Sun protection is generally not needed unless you are outside for extended periods.', 'UV_LOW', 0, 2, NULL, NULL, 'ANY', NULL, NULL, false, NULL, 'https://www.who.int/health-topics/ultraviolet-radiation'),
('UV_TIP', 'Moderate UV. Wear sunglasses on bright days. If you burn easily, cover up and use broad-spectrum SPF 30+ sunscreen.', 'UV_MODERATE', 3, 5, NULL, NULL, 'ANY', NULL, NULL, false, NULL, 'https://www.who.int/health-topics/ultraviolet-radiation'),
('UV_TIP', 'High UV. Seek shade during midday hours! Wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Apply SPF 30+ sunscreen every 2 hours.', 'UV_HIGH', 6, 7, NULL, NULL, 'ANY', NULL, NULL, false, NULL, 'https://www.who.int/health-topics/ultraviolet-radiation'),
('UV_TIP', 'Very High UV. Protection is crucial. Avoid the sun between 10 a.m. and 4 p.m. Generously apply SPF 30+ sunscreen every 2 hours.', 'UV_VERY_HIGH', 8, 10, NULL, NULL, 'ANY', NULL, NULL, false, NULL, 'https://www.epa.gov/sunsafety'),
('UV_TIP', 'Extreme UV. Take all precautions. Unprotected skin and eyes can burn in minutes. Avoid all sun exposure between 10 a.m. and 4 p.m.', 'UV_EXTREME', 11, 20, NULL, NULL, 'ANY', NULL, NULL, false, NULL, 'https://www.epa.gov/sunsafety');

-- --- AQI TIPS (Based on AQI Index 1-5) ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('AQI_TIP', 'Air quality is excellent. It''s a great day to be active outside!', 'AQI_GOOD', NULL, NULL, 1, 1, 'ANY', NULL, NULL, false, NULL, NULL),
('AQI_TIP', 'Air quality is fair. Unusually sensitive people should consider reducing prolonged or heavy exertion.', 'AQI_FAIR', NULL, NULL, 2, 2, 'ANY', NULL, NULL, false, NULL, NULL),
('AQI_TIP', 'Air quality is moderate. Active children and adults, and people with respiratory disease, should limit prolonged outdoor exertion.', 'AQI_MODERATE', NULL, NULL, 3, 3, 'ANY', NULL, NULL, false, NULL, NULL),
('AQI_TIP', 'Air quality is poor. Everyone should reduce heavy outdoor exertion. People with respiratory or heart disease should avoid outdoor activity.', 'AQI_POOR', NULL, NULL, 4, 4, 'ANY', NULL, NULL, false, NULL, NULL),
('AQI_TIP', 'Air quality is hazardous. This is a health alert. Everyone should avoid all outdoor physical activity.', 'AQI_HAZARDOUS', NULL, NULL, 5, 5, 'ANY', NULL, NULL, false, NULL, NULL);

-- --- HEALTH TIPS (Personalized) ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('HEALTH_TIP', 'Air quality is poor. As you have asthma, it is strongly advised to stay indoors and keep your reliever inhaler nearby.', 'HEALTH_ASTHMA_POOR', NULL, NULL, 4, 5, 'ANY', NULL, 'ASTHMA', false, NULL, NULL),
('HEALTH_TIP', 'Air quality is moderate. If you have asthma, consider limiting prolonged or heavy outdoor exertion today.', 'HEALTH_ASTHMA_MODERATE', NULL, NULL, 3, 3, 'ANY', NULL, 'ASTHMA', false, NULL, NULL),
('HEALTH_TIP', 'Pollen counts can be high even with good air quality. If you have allergies, consider taking medication before going out.', 'HEALTH_ALLERGIES_GENERAL', NULL, NULL, 1, 3, 'ANY', NULL, 'ALLERGIES', false, NULL, NULL);

-- --- SKIN TYPE TIPS (Personalized) ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('UV_TIP', 'You have sensitive skin. Even on moderate UV days, it is crucial to apply a mineral-based (zinc oxide) SPF 30+ sunscreen.', 'UV_SENSITIVE', 3, 5, NULL, NULL, 'ANY', 'SENSITIVE', NULL, false, NULL, NULL),
('UV_TIP', 'You have sensitive skin, and the UV index is high. Reapply sunscreen every 90 minutes and seek shade.', 'UV_SENSITIVE_HIGH', 6, 20, NULL, NULL, 'ANY', 'SENSITIVE', NULL, false, NULL, NULL);

-- --- PRODUCT SUGGESTIONS ---
INSERT INTO suggestions (suggestion_type, text, unique_code, min_uv, max_uv, min_aqi, max_aqi, applicable_grade, applicable_skin_type, applicable_condition, location_specific, product_category, source_url)
VALUES
('PRODUCT', 'UV index is moderate to high. A broad-spectrum sunscreen with at least SPF 30 is recommended.', 'PRODUCT_SUNSCREEN_30', 3, 7, NULL, NULL, 'ANY', NULL, NULL, false, 'SUNSCREEN', NULL),
('PRODUCT', 'UV index is very high or extreme. Use a broad-spectrum, water-resistant sunscreen with SPF 50+.', 'PRODUCT_SUNSCREEN_50', 8, 20, NULL, NULL, 'ANY', NULL, NULL, false, 'SUNSCREEN', NULL),
('PRODUCT', 'Don''t forget to wear UV-blocking sunglasses to protect your eyes.', 'PRODUCT_GLASSES', 3, 20, NULL, NULL, 'ANY', NULL, NULL, false, 'GLASSES', NULL),
('PRODUCT', 'A wide-brimmed hat provides excellent protection for your face, neck, and ears.', 'PRODUCT_HAT', 6, 20, NULL, NULL, 'ANY', NULL, NULL, false, 'HAT', NULL);