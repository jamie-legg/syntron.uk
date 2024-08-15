# We use the const REGION_ENV which gets replaced by the region name
# during the build process. This is a hack to get the region name
# into the container.

import os
from lib.config import ukConfig, usConfig

REGION_ENV = "REGION"

def load_env():
    

    #! A
    if REGION_ENV in os.environ:
        region = os.environ[REGION_ENV]
        if region == "us":
            usConfig()
        elif region == "uk":
            ukConfig()
    else:
        raise ValueError(f"Environment variable {REGION_ENV} not set")
    print(f"CONSOLE_MESSAGE Loaded region {region}")

load_env()