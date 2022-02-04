# GOAL: To test how two identical time series score.

import json
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean
import numpy as np

def parse_json(filename):
    with open(filename, "r") as f:
        return json.loads(f.read())

def _add_bodypart(frame, bodypart):
    if not bodypart in frame:
        return 2**32 - 1
    else:
        return frame[bodypart]

if __name__ == "__main__":
    data = parse_json("parsed_output.json")["data"]
    parsed_data = []

    keys = data[0].keys()

    for frame in data:
        parsed_frame = []

        if frame:
            for key in keys:
                parsed_frame.append(_add_bodypart(frame, key))

            parsed_data.append(parsed_frame)


    print(fastdtw(np.array(parsed_data), np.array(parsed_data), dist=euclidean)[0])

# CHANGING THE ACCEPT BOUNDARY WILL CHANGE THE DIFFICULTY OF THE LEVEL