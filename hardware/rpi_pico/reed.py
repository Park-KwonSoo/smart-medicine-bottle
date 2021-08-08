from machine import Pin, Signal

data_pin = Pin(16, Pin.IN)

# --------------------------------------------------- #
# FUNCTIONS
# --------------------------------------------------- #
def work_reed() -> int:
    # 1 = Lid opened, 0 = Lid closed
    return data_pin.value()
