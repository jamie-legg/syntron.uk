# lib/event_checker.py

class EventChecker:
    def __init__(self):
        self.current_line = ""

    def set_line(self, line):
        self.current_line = line

    def e(self, event_type):
        return self.current_line.startswith(event_type)