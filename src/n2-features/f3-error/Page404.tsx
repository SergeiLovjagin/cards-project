import style from './Page404.module.scss'

export const Page404 = () => {
    return (
        <div className={style.container}>
            <h1>Not found <span>:(</span></h1>
            <p>Sorry, but the page you were trying to view does not exist.</p>
            <i>404</i>
        </div>
    )
}