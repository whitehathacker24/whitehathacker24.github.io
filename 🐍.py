import numpy as np

class UnlimitedDataModel:
    
    def __init__(self):
        self.data = np.array([])
    
    def add_data(self, new_data):
        if self.data.size == 0:
            self.data = new_data
        else:
            self.data = np.concatenate((self.data, new_data), axis=0)
    
    def train(self):
        # Your training code here
        pass
    
    def predict(self, x):
        # Your prediction code here
        pass
