import "./static/section.css";
import "./static/box.css";

export default function Section( {children} ) {
    return <section className="main-section">
        { children }
    </section>
}
