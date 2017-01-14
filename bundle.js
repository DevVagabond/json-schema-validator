v = JSONSchema({
    k1: {
        type: String
    },
    k2: {
        type: Number
    },
    k3: {
        type: Boolean
    },
    k4: [{
        x: {
            type: Number
        },
        y: {
            type: String
        }
    }],
    k5: {
        type: Date
    },
    k6: {
        x: {
            type: Boolean
        },
        y: {
            type: Date
        },
        z: {
            m: {
                type: String
            },
            n: {
                type: Date
            }
        }
    }
});

r = v.validate({
    k1: '1',
    k2: 10,
    k3: true,
    k4: [{
        x: 10,
        y: "sdf"
    },
    {
        x: '20',
        y: "sdgfds"
    }
    ],
    k5: new Date(),
    k6: {
        x: false,
        y: new Date(),
        z: {
            n: "sdfgfdg",
            m: new Date()
        }
    }
})

console.log(r);