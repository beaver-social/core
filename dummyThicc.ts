interface Surface {
  entities: Entity[];
  variables: Variable[];
}

type Entity =
  | {
    type: "input";
    matches?: RegExp;
    placeholder?: string;
    width?: number | "auto";
    height?: number | "auto";
    var: string;
  }
  | {
    type: "image";
    src: string;
    width?: number | "auto";
    height?: number | "auto";
  }
  | {
    type: "text";
    content: string;
  }
  | {
    type: "layout";
    direction: "x" | "y";
    children: Entity[];
    width?: number | "auto";
    height?: number | "auto";
  }
  | {
    type: "map";
    source: string;
    entity: Entity;
  };

interface Variable {
  name: string;
  type?: "individual" | "vector";
  defaultValue?: any;
}

const zero: Surface = {
  variables: [{ name: "os", type: "vector" }],
  entities: [
    {
      type: "map",
      source: "$os",
      entity: {
        type: "input",
        var: "out{--k}",
        placeholder: "Choose : {--v}",
      },
    },
  ],
} as const;

async function render<S extends Surface>(
  surface: S,
  values: Record<S["variables"][number]["name"], string>
) { }

render(zero, {});


const dummysui =
{
  "digest": "D2dD4yW3jhdXAeYGcDwvXgas5S9rzjozYoFrEkydRNsR",
  "transaction": {
    "data": {
      "messageVersion": "v1",
      "transaction": {
        "kind": "ProgrammableTransaction",
        "inputs": [
          {
            "type": "pure",
            "valueType": "address",
            "value": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
          }
        ],
        "transactions": [
          {
            "Publish": [
              "0x0000000000000000000000000000000000000000000000000000000000000001",
              "0x0000000000000000000000000000000000000000000000000000000000000002",
              "0x67072134f0867b886c9541873d1cb327feb7e161cd56dd76cb6aa9e464410db1"
            ]
          },
          {
            "TransferObjects": [
              [
                {
                  "Result": 0
                }
              ],
              {
                "Input": 0
              }
            ]
          }
        ]
      },
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "gasData": {
        "payment": [
          {
            "objectId": "0x504832ff4a4be5e1094370e3d10f7f7e184760a520892deadc46aab86f94c98c",
            "version": 372748796,
            "digest": "5oCyKtWy38eW74Qq9FKVsUmGhZFMwGJcxMoLwmBuvsbD"
          }
        ],
        "owner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
        "price": "1000",
        "budget": "61956400"
      }
    },
    "txSignatures": [
      "ABWYhKdE3JOBvMfqsdsAlHRQ47TIVQDtpc2ZQdnm7kCd0bqORJRhbZf0x3wTnLRyEoZ4I2ojfI13t4umdYZIRwP0FbBPVuNIvcg1hfNPpi5ctx1LS89bbwXSDELS/rdP1A=="
    ]
  },
  "effects": {
    "messageVersion": "v1",
    "status": {
      "status": "success"
    },
    "executedEpoch": "697",
    "gasUsed": {
      "computationCost": "1000000",
      "storageCost": "59956400",
      "storageRebate": "978120",
      "nonRefundableStorageFee": "9880"
    },
    "modifiedAtVersions": [
      {
        "objectId": "0x504832ff4a4be5e1094370e3d10f7f7e184760a520892deadc46aab86f94c98c",
        "sequenceNumber": "372748796"
      }
    ],
    "transactionDigest": "D2dD4yW3jhdXAeYGcDwvXgas5S9rzjozYoFrEkydRNsR",
    "created": [
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0x192cf9ab66495c3aec5f4e840bf82ace275957cbc72f166f3cd8f50a4e3fd3f5",
          "version": 372748797,
          "digest": "8NErAPDdvPNPtFgVsHayfWdDKuYRP3AWBKd2xHazKaoS"
        }
      },
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0x275a482306408dae98f24638c830420fb80c99d279e919db807589c8b927f0ca",
          "version": 372748797,
          "digest": "H8kYcP4UBAnRxko2dA4aCdqrHCvmQREL3ATUy5DjFFje"
        }
      },
      {
        "owner": {
          "Shared": {
            "initial_shared_version": 372748797
          }
        },
        "reference": {
          "objectId": "0x2f801c5428a6616e3e7f5ba053e6abaed3188cca110e1336998e89f0c8a9f7c2",
          "version": 372748797,
          "digest": "9KpBV3AqHJPgBU4i7r6SXx6urNFjE19R6o9XA1qmriqf"
        }
      },
      {
        "owner": {
          "Shared": {
            "initial_shared_version": 372748797
          }
        },
        "reference": {
          "objectId": "0x519414ed9dbb76a33cdb80a70349dd03744794f0b8161b66b578961837220b94",
          "version": 372748797,
          "digest": "7jgtqaNVra8EbnBgejde5qAaD2Naus6WP7yvuJeY2Ybd"
        }
      },
      {
        "owner": {
          "Shared": {
            "initial_shared_version": 372748797
          }
        },
        "reference": {
          "objectId": "0x712790714a5df2319b55409a5e5299f5c5bf9df797b07f0da410d393596b0166",
          "version": 372748797,
          "digest": "FarhtVDaZ6LeMZhVfw4zakdFUV3tsh265ZCegUmQUJCs"
        }
      },
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0x77386eea89aa60ba3d2efc25e4dd9cef19f34daa371cc368745760a80dea88d0",
          "version": 372748797,
          "digest": "BmJUJwEViwPaeE7z7m4L9My3f5yWW4c4Qzrrr9QpZmHq"
        }
      },
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0xa589e22fc9a8c604f6839eed6d1659b42b4f582a445df74f9785a6b7b038ec66",
          "version": 372748797,
          "digest": "GpfsbEXbKsUY5aeuVijHJuqcTNwoEMb6KBCuVZrrxtpD"
        }
      },
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0xd5a02a43157690c6d2daffb3bf9cf496b7bb00bf3a2a29bdda1b86c5f3bf1d4b",
          "version": 372748797,
          "digest": "22GAZaNWTTPEEG1sqiLmxtZAd4PioJcfaeQcdm7tyx9m"
        }
      },
      {
        "owner": "Immutable",
        "reference": {
          "objectId": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6",
          "version": 1,
          "digest": "J1gDNjR7e7HcUKq1TiTsfUkPh9Tzqg1AwS3nzyjK6sun"
        }
      }
    ],
    "mutated": [
      {
        "owner": {
          "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
        },
        "reference": {
          "objectId": "0x504832ff4a4be5e1094370e3d10f7f7e184760a520892deadc46aab86f94c98c",
          "version": 372748797,
          "digest": "2UwWuDCJt5aQr64fcbU6tFZRQAX4C1v9yN9Y5URFKw4s"
        }
      }
    ],
    "gasObject": {
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "reference": {
        "objectId": "0x504832ff4a4be5e1094370e3d10f7f7e184760a520892deadc46aab86f94c98c",
        "version": 372748797,
        "digest": "2UwWuDCJt5aQr64fcbU6tFZRQAX4C1v9yN9Y5URFKw4s"
      }
    },
    "eventsDigest": "BnKo23V76EAjbCpLDB3Byup9qaZRV2WP9oy98cxnRova",
    "dependencies": [
      "2KKFDYfXCwBWaS1e3i4gLnjW1DsQoWqYQMb4SVBZFQR2",
      "529gXBgfiDC9qTmTmRvuX2iFCsU3RGcmuuiEjpE21EnW",
      "J5fMo56EtPKMsU4cGXeu4CaZ1aJky9bZZ3wNrf2KHadv"
    ]
  },
  "events": [
    {
      "id": {
        "txDigest": "D2dD4yW3jhdXAeYGcDwvXgas5S9rzjozYoFrEkydRNsR",
        "eventSeq": "0"
      },
      "packageId": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6",
      "transactionModule": "identity_registration",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "type": "0x2::display::DisplayCreated<0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::identity_registration::IdentityRegistration>",
      "parsedJson": {
        "id": "0xd5a02a43157690c6d2daffb3bf9cf496b7bb00bf3a2a29bdda1b86c5f3bf1d4b"
      },
      "bcsEncoding": "base64",
      "bcs": "1aAqQxV2kMbS2v+zv5z0lre7AL86Kim92huGxfO/HUs="
    },
    {
      "id": {
        "txDigest": "D2dD4yW3jhdXAeYGcDwvXgas5S9rzjozYoFrEkydRNsR",
        "eventSeq": "1"
      },
      "packageId": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6",
      "transactionModule": "identity_registration",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "type": "0x2::display::VersionUpdated<0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::identity_registration::IdentityRegistration>",
      "parsedJson": {
        "fields": {
          "contents": [
            {
              "key": "name",
              "value": "@{username}"
            },
            {
              "key": "link",
              "value": "http://xksgo8ggkwsgooc84o0ok0c8.176.57.188.144.sslip.io/api/v1/user/{id}"
            },
            {
              "key": "image_url",
              "value": "http://xksgo8ggkwsgooc84o0ok0c8.176.57.188.144.sslip.io/api/v1/nft/img/{id}"
            },
            {
              "key": "description",
              "value": "Beaver Social - The social layer of the decentralized web"
            },
            {
              "key": "project_url",
              "value": "http://xksgo8ggkwsgooc84o0ok0c8.176.57.188.144.sslip.io"
            },
            {
              "key": "creator",
              "value": "Beaver Social"
            }
          ]
        },
        "id": "0xd5a02a43157690c6d2daffb3bf9cf496b7bb00bf3a2a29bdda1b86c5f3bf1d4b",
        "version": 1
      },
      "bcsEncoding": "base64",
      "bcs": "1aAqQxV2kMbS2v+zv5z0lre7AL86Kim92huGxfO/HUsBAAYEbmFtZQtAe3VzZXJuYW1lfQRsaW5rSGh0dHA6Ly94a3NnbzhnZ2t3c2dvb2M4NG8wb2swYzguMTc2LjU3LjE4OC4xNDQuc3NsaXAuaW8vYXBpL3YxL3VzZXIve2lkfQlpbWFnZV91cmxLaHR0cDovL3hrc2dvOGdna3dzZ29vYzg0bzBvazBjOC4xNzYuNTcuMTg4LjE0NC5zc2xpcC5pby9hcGkvdjEvbmZ0L2ltZy97aWR9C2Rlc2NyaXB0aW9uOUJlYXZlciBTb2NpYWwgLSBUaGUgc29jaWFsIGxheWVyIG9mIHRoZSBkZWNlbnRyYWxpemVkIHdlYgtwcm9qZWN0X3VybDdodHRwOi8veGtzZ284Z2drd3Nnb29jODRvMG9rMGM4LjE3Ni41Ny4xODguMTQ0LnNzbGlwLmlvB2NyZWF0b3INQmVhdmVyIFNvY2lhbA=="
    }
  ],
  "objectChanges": [
    {
      "type": "mutated",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0x2::coin::Coin<0x2::sui::SUI>",
      "objectId": "0x504832ff4a4be5e1094370e3d10f7f7e184760a520892deadc46aab86f94c98c",
      "version": "372748797",
      "previousVersion": "372748796",
      "digest": "2UwWuDCJt5aQr64fcbU6tFZRQAX4C1v9yN9Y5URFKw4s"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::identity_registration::IdentityRegistration",
      "objectId": "0x192cf9ab66495c3aec5f4e840bf82ace275957cbc72f166f3cd8f50a4e3fd3f5",
      "version": "372748797",
      "digest": "8NErAPDdvPNPtFgVsHayfWdDKuYRP3AWBKd2xHazKaoS"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0x2::package::UpgradeCap",
      "objectId": "0x275a482306408dae98f24638c830420fb80c99d279e919db807589c8b927f0ca",
      "version": "372748797",
      "digest": "H8kYcP4UBAnRxko2dA4aCdqrHCvmQREL3ATUy5DjFFje"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "Shared": {
          "initial_shared_version": 372748797
        }
      },
      "objectType": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::identity_registration::FollowRegistry",
      "objectId": "0x2f801c5428a6616e3e7f5ba053e6abaed3188cca110e1336998e89f0c8a9f7c2",
      "version": "372748797",
      "digest": "9KpBV3AqHJPgBU4i7r6SXx6urNFjE19R6o9XA1qmriqf"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "Shared": {
          "initial_shared_version": 372748797
        }
      },
      "objectType": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::admin::AdminsRecord",
      "objectId": "0x519414ed9dbb76a33cdb80a70349dd03744794f0b8161b66b578961837220b94",
      "version": "372748797",
      "digest": "7jgtqaNVra8EbnBgejde5qAaD2Naus6WP7yvuJeY2Ybd"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "Shared": {
          "initial_shared_version": 372748797
        }
      },
      "objectType": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::registry::Registry",
      "objectId": "0x712790714a5df2319b55409a5e5299f5c5bf9df797b07f0da410d393596b0166",
      "version": "372748797",
      "digest": "FarhtVDaZ6LeMZhVfw4zakdFUV3tsh265ZCegUmQUJCs"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::admin::AdminCap",
      "objectId": "0x77386eea89aa60ba3d2efc25e4dd9cef19f34daa371cc368745760a80dea88d0",
      "version": "372748797",
      "digest": "BmJUJwEViwPaeE7z7m4L9My3f5yWW4c4Qzrrr9QpZmHq"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0x2::package::Publisher",
      "objectId": "0xa589e22fc9a8c604f6839eed6d1659b42b4f582a445df74f9785a6b7b038ec66",
      "version": "372748797",
      "digest": "GpfsbEXbKsUY5aeuVijHJuqcTNwoEMb6KBCuVZrrxtpD"
    },
    {
      "type": "created",
      "sender": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9",
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "objectType": "0x2::display::Display<0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6::identity_registration::IdentityRegistration>",
      "objectId": "0xd5a02a43157690c6d2daffb3bf9cf496b7bb00bf3a2a29bdda1b86c5f3bf1d4b",
      "version": "372748797",
      "digest": "22GAZaNWTTPEEG1sqiLmxtZAd4PioJcfaeQcdm7tyx9m"
    },
    {
      "type": "published",
      "packageId": "0xf19d43771a41a283afb6da93b9eb6b794ba43d8824844a94381ad98e8f125cc6",
      "version": "1",
      "digest": "J1gDNjR7e7HcUKq1TiTsfUkPh9Tzqg1AwS3nzyjK6sun",
      "modules": [
        "admin",
        "identity_registration",
        "registry",
        "test_helpers"
      ]
    }
  ],
  "balanceChanges": [
    {
      "owner": {
        "AddressOwner": "0x19aa7d39c774900f674650ba0c6d4a08ee826f9eb1f2172d049347a7919022e9"
      },
      "coinType": "0x2::sui::SUI",
      "amount": "-59978280"
    }
  ],
  "timestampMs": "1744016310551",
  "confirmedLocalExecution": true,
  "checkpoint": "181842486"
}
