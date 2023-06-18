export default function MapSection() {
    return (
        <div className="map-wrapper" id="map">
            <div className="map">
                <h2 className="title--style1">Find a printed copy of <span className="italic">Klinkt.</span> here</h2>
                <div className="map-content">
                    <iframe
                        src="https://www.google.com/maps/d/u/0/embed?mid=13DCRMud4rKhgcOehUnY0Xu5UNyH2l9Y&ehbc=2E312F"
                        width="640"
                        height="480"
                        className="my-map">
                    </iframe>
                    <div className="map-info">
                        <div className="place">
                            <p className="place__name">The Penta</p>
                            <p className="place__specification">Howest Campus Kortrijk Weide</p>
                        </div>
                        <p className="address">Sint-Martens-Latemlaan 1B, 8500 Kortrijk</p>
                        <div className="opening-hours">
                            <div className="opening-hours__day">
                                <p>Monday</p>
                                <p>8am - 6pm</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Tuesday</p>
                                <p>8am - 6pm</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Wednesday</p>
                                <p>8am - 6pm</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Thursday</p>
                                <p>8am - 6pm</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Friday</p>
                                <p>8am - 6pm</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Saturday</p>
                                <p>Closed</p>
                            </div>
                            <div className="opening-hours__day">
                                <p>Sunday</p>
                                <p>Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
