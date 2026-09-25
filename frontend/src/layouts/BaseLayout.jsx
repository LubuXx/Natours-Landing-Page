import Header from '../components/Header'
import Footer from '../components/Footer';
import RouterSchemas from '../Schemas/RouterSchemas';

function BaseLayout() {
    return (
        <div>
            <Header />
            <RouterSchemas />
            <Footer />
        </div>
    );
}

export default BaseLayout