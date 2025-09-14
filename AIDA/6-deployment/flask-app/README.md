# Flask Machine Learning Application

This repository contains a Flask web application that utilizes a machine learning model to predict car prices and classify them into different price categories.

## Project Structure

```markdown
│   app.py
│   README.md
│
├───static
│   │   styles.css
│   │
│   └───img
│           favicon.ico
│           logo.png
│           vecteezy_close-up-view-of-a-car-tire_27275841.jpg
│           wp4280349.jpg
│
└───templates
        index.html
        results.html
```

The application uses Flask to serve a web interface where users can input car data and receive price predictions.

## Setup and Installation

### Requirements

- Python 3.x
- Flask
- Scikit-Learn (for the machine learning model)

### Installation Steps

1. Navigate to the project directory

2. Install the required packages:

- pip install flask scikit-learn

### Running the Application

1. Start the Flask server:

   - python app.py

2. Access the application via a web browser:

   - [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

### Using the Application

- Fill in the form with the required car characteristics.
- Submit the form to get the price prediction.
- The result will be displayed on the same page.

## Deployment

in this course we will only make the application locally
