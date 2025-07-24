export default function HeaderLanguageSelector() {
    return (
        <li className="nav-item">
            <form className="language" method="get">
                <label className="text-white" htmlFor="lang">Language</label>
                <select className="item-lang" id="lang" name="lang" onChange={(e) => e.target.form.submit()}>
                    <option value="en_US">En</option>
                    <option value="bg_BG">Бг</option>
                </select>
            </form>
        </li>
    );
}