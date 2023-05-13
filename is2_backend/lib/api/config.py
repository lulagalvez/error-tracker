from dotenv import load_dotenv
import os

load_dotenv()

class ApplicationConfig:
    SQLALCHEMY_TACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO = True
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True