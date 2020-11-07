#!/usr/bin/env python
# coding: utf-8

# In[1]:

import sys
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)


# In[2]:


matches=pd.read_csv('matches.csv')
#matches.info()
#matches.head()


# In[3]:


matches = matches[['team1','team2','city','toss_decision','toss_winner','venue','winner']]
#matches.head(2)
#matches.head(7)


# In[4]:


matches[pd.isnull(matches['winner'])]
#find all NaN values in winner column, so that we update this as draw


# In[5]:


matches['winner'].fillna('Draw', inplace=True)


# In[6]:


matches.loc[241,'winner']


# In[7]:


df3= matches
df4=df3[0:0]
df4
#rowdata=['Mumbai Indians','Kolkata Knight Riders',"Mumbai","bat",'Mumbai Indians',"Eden Gardens",'Mumbai Indians']
rowdata = [sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7]]
df4.loc[0] = rowdata
df4
matches = pd.concat([matches,df4], ignore_index=True)


# In[8]:


matches


# In[9]:


matches.replace(['Mumbai Indians','Kolkata Knight Riders','Royal Challengers Bangalore','Deccan Chargers','Chennai Super Kings',
                 'Rajasthan Royals','Delhi Daredevils','Gujarat Lions','Kings XI Punjab',
                 'Sunrisers Hyderabad','Rising Pune Supergiants','Kochi Tuskers Kerala','Pune Warriors']
                ,['MI','KKR','RCB','DC','CSK','RR','DD','GL','KXIP','SRH','RPS','KTK','PW'],inplace=True)


#matches.head(2)


# In[10]:


encode = {'team1': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
          'team2': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
          'toss_winner': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
          'winner': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13,'Draw':14}}
matches.replace(encode, inplace=True)
#matches.head(2)


# In[11]:


#Find cities which are null
matches[pd.isnull(matches['city'])]


# In[12]:


#remove any null values, winner has hence fill the null value in winner as draw
#City is also null, this is mainly for Dubai stadium. Hence update the City as Dubai
#Make sure to impute the data(cleansing and finding missing data), there is also other process 
#to verify expected value based on other resultants, for now by stadium, city is easily manually updated
matches['city'].fillna('Dubai',inplace=True)
matches.describe()
#matches.info()


# In[13]:


matches = matches[['team1','team2','city','toss_decision','toss_winner','venue','winner']]
#matches.head(2)


# In[14]:


matches


# In[15]:


df = matches


# In[16]:


#31 cities
df["city"].unique()


# In[17]:


#35 venues
df["venue"].unique()


# In[18]:


#Find cities which are null
df[pd.isnull(df['city'])]


# In[19]:


df


# In[20]:


#building predictive model , convert categorical to numerical data
from sklearn.preprocessing import LabelEncoder
var_mod = ['city','toss_decision','venue']
le = LabelEncoder()
for i in var_mod:
    df[i] = le.fit_transform(df[i])
df
 


# In[21]:


df6 = df.iloc[[-1]]


# In[22]:


df6


# In[23]:


df


# In[24]:


df.drop(df.tail(1).index,inplace=True)


# In[25]:


df


# In[26]:


from sklearn import svm
from sklearn.linear_model import LogisticRegression
# from sklearn.cross_validation import KFold   #For K-fold cross validation
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from sklearn import metrics
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create SVM classification object 
model = svm.SVC(kernel='rbf', C=1, gamma=1) 
outcome=['winner']
predictors = ['team1', 'team2', 'venue', 'toss_winner','city','toss_decision']
model.fit(df[predictors],df[outcome])
predictions = model.predict(df6[predictors])
#print(predictions)


# In[37]:


# matches.replace(['Mumbai Indians','Kolkata Knight Riders','Royal Challengers Bangalore','Deccan Chargers','Chennai Super Kings',
#                  'Rajasthan Royals','Delhi Daredevils','Gujarat Lions','Kings XI Punjab',
#                  'Sunrisers Hyderabad','Rising Pune Supergiants','Kochi Tuskers Kerala','Pune Warriors']
#                 ,['MI','KKR','RCB','DC','CSK','RR','DD','GL','KXIP','SRH','RPS','KTK','PW'],inplace=True)
# encode = {'team1': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
#           'team2': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
#           'toss_winner': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13},
#           'winner': {'MI':1,'KKR':2,'RCB':3,'DC':4,'CSK':5,'RR':6,'DD':7,'GL':8,'KXIP':9,'SRH':10,'RPS':11,'KTK':12,'PW':13,'Draw':14}}
# matches.replace(encode, inplace=True)
# matches.head(2)


encode_final = {1:'Mumbai Indians', 2:'Kolkata Knight Riders',3:'Royal Challengers Bangalore',4:'Deccan Chargers',
                  5:'Rajasthan Royals',6:'Rajasthan Royals',7:'Delhi Daredevils',8:'Gujarat Lions',9:'Kings XI Punjab'
                   ,10:'Sunrisers Hyderabad',11:'Rising Pune Supergiants',12:'Kochi Tuskers Kerala',13:'Pune Warriors'}

# predictions.replace(encode, inplace=True)
prediction = predictions[0]

if df6['team1'].iloc[0] == prediction or df6['team2'].iloc[0] == prediction: 
    x = "Nice work by model"
else:
    prediction = df6['team2'].iloc[0]


final_prediction=encode_final[prediction]
print(final_prediction)
sys.stdout.flush()


# In[ ]:




