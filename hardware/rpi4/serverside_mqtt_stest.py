import paho.mqtt.publish as publish

# hub -> server
# msgs = \
# [
#     {
#         'topic':"bottle/1/bts",
#         'payload':"1/30.4/32.2/1"
#     }
# ]

# server -> hub with date
# msgs = \
# [
#     {
#         'topic':"bottle/1/stb",
#         'payload':"res/0513"
#     }
# ]

# server -> hub without date
msgs = \
[
    {
        'topic':"bottle/1/stb",
        'payload':"req"
    }
]

publish.multiple(msgs, hostname="localhost")
