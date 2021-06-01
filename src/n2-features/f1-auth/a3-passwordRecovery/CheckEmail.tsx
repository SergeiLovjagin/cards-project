

type CheckEmailType = {
    email: string
}

export const CheckEmail = (props: CheckEmailType) => {
    return (
        <div>
            <h2>IT-INCUBATOR</h2>
            <div>Some image</div>
            <h3>Check Email</h3>
            <div>{`We have sent an Email with with instructions to ${props.email}`}</div>
        </div>
    )
}