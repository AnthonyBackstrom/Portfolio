# Car Price Predictor - AIDA

## Overview

The purpose of this project is to read the collected data, analyze it, make a machine learning model or models from the given data, and try to present the results taking into account the customer's needs.

## Project group

| Name | StudentID |
| :-- | :-: |
| Bäckström Anthony | AB0000 |
| Aleksander | AB0000 |
| Iiro | N0000 |
| Iina | AB0000 |

## CRISP-DM Model

We use the CRISP-DM model (CRoss Industry Standard Process for Data Mining) in our work, which includes six different steps:

1. Business understanding – What does the business need?
2. Data understanding – What data do we have / need? Is it clean?
3. Data preparation – How do we organize the data for modeling?
4. Modeling – What modeling techniques should we apply?
5. Evaluation – Which model best meets the business objectives?
6. Deployment – How do stakeholders access the results?

## Project Steps

### 1. Business understanding

[Requirements](./1-business-understanding/requirement-specification.ipynb)

[Project plan](./1-business-understanding/project-plan.ipynb)

### 2. Data understanding

[Data Description Report](./2-data-understanding/data-description-report.ipynb)

### 3. Data preparation

[Data Preparation Report](./3-data-preparation/data-preparation-report.ipynb)

[Impact of Sales Area on Vehicle's Age, Type, and Price](./3-data-preparation/sales_area.ipynb)

[Cars That Sell the Worst](./3-data-preparation/worst_cars.ipynb)

[Effect on Price for Vehicles Used as Taxis](./3-data-preparation/taxi.ipynb)

[Identifying Dominant Features for Sales](./3-data-preparation/dominant-feats/dominant-features.ipynb)

### 4. Modeling

[Final dataset](./4-modeling/final_clean.ipynb)

[Latest model](./4-modeling/lightgbm_model.ipynb)

[Optuna parameter optimization](./4-modeling/optuna_optimization.ipynb)

### 5. Evaluation

[Model Evaluation](./5-evaluation/Modeling_Stage_Report.ipynb)

### 6. Deployment

[End report](./6-deployment/report/end_report.ipynb)

[Application](./6-deployment/flask-app/)
