import React from 'react'

import './search.css'

import Menu from "../components/Menu"

import { supabase } from '../backend/SupabaseClient';
import blur from "../images/blurPDFBG.jpg"

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

function Search() {
    const [title, setTitle] = React.useState('');
    const [keywords, setKeywords] =React.useState('');
    const [file, setFile] = React.useState(null);
    const [pdfs, setPdfs] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState(''); 
  
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [selectedPdf, setSelectedPdf] = React.useState(null);
  
    const handleButtonClick = (pdf) => {
      setSelectedPdf(pdf);
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);  
    };
  
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
  
    const filterPdfs = () => {
      if (!searchQuery) return pdfs;  
    
      return pdfs.filter((pdf) => {
        const keywordString = (pdf.keywords || '').toString().toLowerCase();
        return keywordString.includes(searchQuery.toLowerCase());
      });
    };
  
    React.useEffect(() => {
      const loadPdfs = async () => {
        const metadata = await fetchAllPDFs();
        if (metadata && metadata.length > 0) {
          setPdfs(metadata);
        }
      };
      loadPdfs();
    }, []);
  
    return (
        <>
        <Menu />
        
        <h1 className='title'>
          Browse Student-created study guides
        </h1>
  
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by keywords"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
  
        <div className='PDFGallery'>
          {filterPdfs().map((pdf, index) => {
            const fileURL = pdf.file_url.substring(
              pdf.file_url.indexOf("https://"),
              pdf.file_url.indexOf(".pdf") + 4
            );
  
            return (
              <div className="subPDF" key={index}>
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
              <button onClick={handleClosePopup} className="close-popup-btn">Close</button>
              <h3>{selectedPdf.title}</h3>
              <p>{selectedPdf.keywords}</p>
              {/* Apply the same URL logic to the iframe */}
              {selectedPdf.file_url && (
                <iframe 
                  src={selectedPdf.file_url.substring(selectedPdf.file_url.indexOf("https://"), selectedPdf.file_url.indexOf(".pdf") + 4)} 
                  title={selectedPdf.title}
                  style={{ border: "1px solid #ccc", width: "100%", height: "500px" }}
                ></iframe>
              )}
            </div>
          </div>
        )}
      </>
    );
}

export default Search
