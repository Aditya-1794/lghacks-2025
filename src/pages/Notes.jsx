import React, { useEffect } from 'react'
import "./Notes.css"

import Menu from "../components/Menu"
import { supabase } from '../backend/SupabaseClient';

import { Document, Page } from 'react-pdf';

import blur from "../images/blurPDFBG.jpg"

const uploadPDF = async (file, title, keywords) => {
    if (!file) return;

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error fetching user:', error.message);
        return;
    }

    if (!user) {
        console.log('User is not logged in');
        return;
    }

    if (!file.name.endsWith('.pdf')) {
        console.error('Only PDF files are allowed');
        return;
    }

    const { data, error: uploadError } = await supabase.storage.from('notes').upload(`pdfs/${file.name}`, file);

    if (uploadError) {
        console.error('Error uploading file:', uploadError.message);
        return;
    }

    console.log("FILE NAME" + file.name);
    const publicURL = supabase.storage.from('notes').getPublicUrl(`pdfs/${file.name}`);
    if (publicURL == null) {
        console.error('Error getting file URL:', urlError.message);
        return;
    }

    const { error: metadataError } = await supabase
        .from('notes_metadata')
        .insert([
            {
                title: title,
                keywords: keywords,
                author_id: user.id, 
                file_url: publicURL, 
            }
        ]);

    if (metadataError) {
        console.error('Error storing metadata:', metadataError.message);
    } else {
        console.log('File uploaded and metadata stored successfully');
    }
};

const fetchAllPDFs = async () => {
    const { data, error } = await supabase
        .from('notes_metadata')
        .select('*');

    if (error) {
        console.error('Error fetching metadata:', error.message);
        return;
    }

    return data;
};

function Notes() {
    const [title, setTitle] = React.useState('');
    const [keywords, setKeywords] = React.useState('');
    const [file, setFile] = React.useState(null);

    const [pdfs, setPdfs] = React.useState([]);

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [selectedPdf, setSelectedPdf] = React.useState(null); 

  const handleButtonClick = (pdf) => {
    setSelectedPdf(pdf);  
    setIsPopupOpen(true);  
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);  
  };

    useEffect(() => {
        const loadPdfs = async () => {
          const metadata = await fetchAllPDFs();
          if (metadata && metadata.length > 0) {
            setPdfs(metadata); 
          }
        };
        loadPdfs();
      }, []);
  
    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file && title && keywords) {
          const keywordArray = keywords.split(',').map((keyword) => keyword.trim());
          uploadPDF(file, title, keywordArray).then(() => {
            fetchAllPDFs().then((metadata) => setPdfs(metadata));
          });
        } else {
          console.error('All fields are required');
        }
      };

    const downloadFile = (fileUrl, fileName) => {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName; 
      link.click();
    };

    return (
      <>
          <Menu />
          <h2 className='title'>Upload your notes</h2>
          <h4 className='subText'>You must be signed in to do so</h4>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Note</button>

      <h1 className='title'>
            Browse Student-created study guides
        </h1>
        <div className='PDFGallery'>
            {pdfs.map((pdf, index) => {
                const start = pdf.file_url.indexOf("https://");
                const end = pdf.file_url.indexOf(".pdf") + 4; 
                const fileURL = pdf.file_url.substring(start, end);

                return (
                  <div className="subPDF" key={index}>
                    {/* Button to open the popup */}
                    <button onClick={() => handleButtonClick(pdf)}>
                      <img src={blur} alt="thumbnail" />
                      <h3>{pdf.title}</h3>
                      <p>{pdf.keywords}</p>
                    </button>
                  </div>
                );
            })}
          </div>

          {/* Popup for iframe */}
          {isPopupOpen && selectedPdf && (
            <div className="popup-overlay">
              <div className="popup-content">
                <div className='popupButtonGroup'>
                <button onClick={handleClosePopup} className="close-popup-btn">Close</button>
                <button 
                  onClick={() => downloadFile(
                    selectedPdf.file_url.substring(selectedPdf.file_url.indexOf("https://"), selectedPdf.file_url.indexOf(".pdf") + 4), 
                    `${selectedPdf.title}.pdf`
                  )} 
                  className="close-popup-btn">
                  Download
                </button>

                </div>
                <h3>{selectedPdf.title}</h3>
                <p>{selectedPdf.keywords}</p>
                {/* Apply the same URL logic to the iframe */}
                {selectedPdf.file_url && (
                  <iframe 
                    src={selectedPdf.file_url.substring(selectedPdf.file_url.indexOf("https://"), selectedPdf.file_url.indexOf(".pdf") + 4)} 
                    title={selectedPdf.title}
                    className="popup-iframe"
                  ></iframe>
                )}
              </div>
            </div>
          )}
      </>
    );
}

export default Notes;