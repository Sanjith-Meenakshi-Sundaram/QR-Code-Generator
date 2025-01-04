import React, { useState } from "react";

export const QRcode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQRData] = useState("");
    const [imageSize, setImageSize] = useState("");

    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${imageSize}x${imageSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating the QR code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        if (!img) {
            alert("Please generate a QR code first!");
            return;
        }

        // Fetch the QR code image as a blob
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob); // Create a local URL for the blob
                link.href = url;
                link.download = "QRCode.png"; // Set the file name
                link.click();
                URL.revokeObjectURL(url); // Clean up the URL object
            })
            .catch((error) => {
                console.error("Error downloading the QR code", error);
            });
    }

    return (
        <div className="app-container">
            <h1 className="title">QR-Generator</h1>

            {loading && <p>Please Wait....</p>}
            {img && <img src={img} alt="Generated QR Code" className="qr-code-img" />}
            <div className="form-container">
                <label htmlFor="dataInput" className="input-label">
                    DATA FOR QR CODE:
                </label>
                <input
                    type="text"
                    id="dataInput"
                    value={qrData}
                    onChange={(e) => setQRData(e.target.value)}
                    placeholder="Enter data for QR Code"
                />
                <label htmlFor="sizeInput" className="input-label">
                    IMAGE SIZE (e.g., 150):
                </label>
                <input
                    type="text"
                    id="sizeInput"
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    placeholder="Enter the Image Size"
                />
                <div className="button-container">
                    <button className="medium-btn" onClick={generateQR}>
                        GENERATE QR CODE
                    </button>
                    <button className="medium-btn" onClick={downloadQR}>
                        DOWNLOAD QR CODE
                    </button>
                </div>
            </div>
            <p className="footer-text" style={{
                fontSize: '18px',
                color: 'white',
                fontStyle: 'italic',
                textAlign: 'center',
                padding: '10px',
                animation: 'fadeIn 2s ease-out'
            }}>
                Created by <span style={{
                    fontSize: '18px',
                    verticalAlign: 'sub',
                    color: 'lightblue',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                    _ Sanjith Meenakshi Sundaram
                </span>
            </p>
        </div>
    );
};

export default QRcode;
