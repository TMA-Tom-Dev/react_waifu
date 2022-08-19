import React, { useState } from 'react'

export default function UseInput({initValue}) {
    const [value, setValue] = useState(initValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind:{
            value,
            onChange: (event) => {
                setValue(event.target.value);

            },
            required: true
        }
    }
}
