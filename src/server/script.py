# %%
import sys
def custom_accuracy(y_test,y_pred,thresold):
    right = 0

    l = len(y_pred)
    for i in range(0,l):
        if(abs(y_pred[i]-y_test[i]) <= thresold):
            right += 1
    return ((right/l)*100)


import pandas as pd
# Importing the dataset
dataset = pd.read_csv('data\odi.csv')
X = dataset.iloc[:,[7,8,9,12,13]].values
y = dataset.iloc[:, 14].values

# %%
# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)


# %%
X_train

# %%
y_train

# %%
from sklearn.linear_model import LinearRegression
lin = LinearRegression()
lin.fit(X_train,y_train)

# Testing the dataset on trained model
y_pred = lin.predict(X_test)

# %%
score = lin.score(X_test,y_test)*100

# %%
score

# %%
import numpy as np
new_prediction = lin.predict(sc.transform(np.array([[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5]]])))
print(new_prediction)
sys.stdout.flush()

# %%


# %%
