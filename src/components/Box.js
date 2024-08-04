export default function Box( { children } ) {
    return (
        <div className="box scroll-div">
            
            <button className="toggle-btn expand-btn">-</button>
            { children }
        </div>
    )
}
