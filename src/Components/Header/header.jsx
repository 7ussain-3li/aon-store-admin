import "./header.css"
import Container from "../Container/container";

const MainHeader = () => {
    return (
        <header>
            <Container>
                <div className="content">
                    <h2>Dashboard</h2>
                    <div className="admin-info">
                        <h3>Admin</h3>
                        <div className="admin-img"></div>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default MainHeader;