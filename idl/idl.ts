export type VotingProgram = {
    "address": "GnYirbPEkU2cjGsLXF7QReLjNF2JWs5eUF2B4wv6vkgB",
    "metadata": {
        "name": "voting_program",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "initialize",
            "discriminator": [
                175,
                175,
                109,
                31,
                13,
                152,
                155,
                237
            ],
            "accounts": [
                {
                    "name": "voteAccount",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "vote",
            "discriminator": [
                227,
                110,
                155,
                23,
                136,
                126,
                172,
                25
            ],
            "accounts": [
                {
                    "name": "voteAccount",
                    "writable": true
                }
            ],
            "args": [
                {
                    "name": "candidate",
                    "type": "u8"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "voteAccount",
            "discriminator": [
                203,
                238,
                154,
                106,
                200,
                131,
                0,
                41
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidCandidate",
            "msg": "Invalid candidate"
        }
    ],
    "types": [
        {
            "name": "voteAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "budiKurniawanVotes",
                        "type": "u64"
                    },
                    {
                        "name": "dewiKartikaVotes",
                        "type": "u64"
                    },
                    {
                        "name": "arifPratamaVotes",
                        "type": "u64"
                    }
                ]
            }
        }
    ]
}


export const IDL: VotingProgram = {
    "address": "GnYirbPEkU2cjGsLXF7QReLjNF2JWs5eUF2B4wv6vkgB",
    "metadata": {
        "name": "voting_program",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "initialize",
            "discriminator": [
                175,
                175,
                109,
                31,
                13,
                152,
                155,
                237
            ],
            "accounts": [
                {
                    "name": "voteAccount",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "vote",
            "discriminator": [
                227,
                110,
                155,
                23,
                136,
                126,
                172,
                25
            ],
            "accounts": [
                {
                    "name": "voteAccount",
                    "writable": true
                }
            ],
            "args": [
                {
                    "name": "candidate",
                    "type": "u8"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "voteAccount",
            "discriminator": [
                203,
                238,
                154,
                106,
                200,
                131,
                0,
                41
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidCandidate",
            "msg": "Invalid candidate"
        }
    ],
    "types": [
        {
            "name": "voteAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "budiKurniawanVotes",
                        "type": "u64"
                    },
                    {
                        "name": "dewiKartikaVotes",
                        "type": "u64"
                    },
                    {
                        "name": "arifPratamaVotes",
                        "type": "u64"
                    }
                ]
            }
        }
    ]
}