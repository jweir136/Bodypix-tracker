from turtle import clear
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean
import numpy as np

x = np.array([1, 2, 3, 3, 7])
y = np.array([1, 2, 2, 2, 2, 2, 2, 4])

distance, path = fastdtw(x, y, dist=euclidean)

print(distance)
print(path)