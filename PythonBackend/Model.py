# Imports
import os
import glob
import fnmatch
import pandas as pd
import numpy as np
import librosa #To deal with Audio files
import math
import tensorflow as tf

from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model

# Load the model
loaded_model = load_model('heart_sounds.h5')
encoding = {0: 'artifact', 1: 'murmer', 2: 'normal'}

def preprocessing (file_path, duration=10, sr=22050):
    input_length=sr*duration
    #print(input_length)
    process_file=[]
    X, sr = librosa.load(file_path, sr=sr, duration=duration)
    dur = librosa.get_duration(y=X, sr=sr)
    # pad audio file same duration
    print(dur)
    if (round(dur) < duration):
        y = librosa.util.fix_length(X, size=input_length)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sr, n_mfcc=25, n_fft=512,hop_length=2048).T,axis=0)
    feature = np.array(mfccs).reshape([-1,1])
    process_file.append(feature)
    process_file_array = np.asarray(process_file)
    return process_file_array

def get_prediction (file):
    x_test = preprocessing(file_path=file)
    y_pred = np.asarray(loaded_model.predict(x_test, batch_size=32))
    y_pred = np.argmax(y_pred,axis=1)
    return encoding[y_pred[0]]