(
    (
        SMA(
            (
                (
                    (CLOSE - LLV(LOW,9)) / HHV(HIGH,9)
                )
                -
                (
                    LLV(LOW,9) * 100
                )
            ),
            3,
            1
        ) * 3
    )
    -
    (
        SMA(
            SMA(
                (
                    (
                        (CLOSE - LLV(LOW,9)) / HHV(HIGH,9)
                    )
                    -
                    (
                        LLV(LOW,9) * 100
                    )
                ),
                3,
                1
            ),
            3,
            1
        ) * 2
    )
)