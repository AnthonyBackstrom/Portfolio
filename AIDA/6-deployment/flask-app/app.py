from flask import Flask, request, render_template
import pickle

app = Flask(__name__)

# Load the machine learning model
model = pickle.load(open('malli.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Extract and process form inputs
    form_values = request.form.to_dict()

    # Initialize a list for the model features
    model_features = []

    # Handling one-hot encoded features
    one_hot_features = {
        'body_type': ['Convertible', 'Coupe', 'Hatchback', 'Minivan', 'Pickup Truck', 'SUV / Crossover', 'Sedan', 'Van', 'Wagon'],
        'make_name': ['AM General', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Datsun', 'Dodge', 'Eagle', 'FIAT', 'Ferrari', 'Fisker', 'Ford', 'GMC', 'Genesis', 'Geo', 'Honda', 'Hummer', 'Hyundai', 'INFINITI', 'Isuzu', 'Jaguar', 'Jeep', 'Karma', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'MINI', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 'Mercury', 'Mitsubishi', 'Nissan', 'Oldsmobile', 'Pininfarina', 'Plymouth', 'Pontiac', 'Porsche', 'RAM', 'Rolls-Royce', 'SRT', 'Saab', 'Saturn', 'Scion', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'smart'],  # Include all car makes as in your data
        'fuel_type': ['Biodiesel', 'Compressed Natural Gas', 'Diesel', 'Flex Fuel Vehicle', 'Gasoline', 'Hybrid', 'Propane'],
        'transmission': ['A', 'CVT', 'Dual Clutch', 'M'],
    }

    # Process each one-hot encoded feature
    for feature, options in one_hot_features.items():
        selected_option = form_values.get(feature)
        for option in options:
            model_features.append(selected_option == f'{feature}_{option}')

    # Process numerical features
    numerical_features = ['mileage', 'year', 'horsepower', 'torque', 'major_options_count', 'fuel_tank_volume', 'highway_fuel_economy', 'city_fuel_economy', 'seller_rating']
    for feature in numerical_features:
        value = float(form_values.get(feature, 0))  # Default to 0 if feature not found
        model_features.append(value)

    # Predict using the model
    prediction = model.predict([model_features])

    # Price range function
    def get_price_range(output):
        if output < 15000:
            return "Economy or Affordable Cars"
        elif 15000 <= output < 30000:
            return "Mid-range Cars"
        elif 30000 <= output < 50000:
            return "Upper Mid Level Cars"
        elif 50000 <= output < 80000:
            return "Premium and Luxury Cars"
        else:
            return "Sports and Super Cars"


    # Format the prediction for display
    output = round(prediction[0], 2)

    # Get the price range class
    price_range_class = get_price_range(output)

    return render_template('results.html', prediction_text=f'Predicted Price: ${output}', price_range_class=price_range_class, form_values=form_values)


if __name__ == "__main__":
    app.run(debug=True)
