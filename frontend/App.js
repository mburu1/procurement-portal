import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Download, Eye, Phone, Mail, MapPin, Menu, X, Building2, FileText, Calendar, Tag, Filter, SortAsc, Bell, User, ChevronDown, Clock, RefreshCw } from 'lucide-react';

const ProcurementPortal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [tenderNo, setTenderNo] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sortBy, setSortBy] = useState('date');
  const contentRef = useRef(null);
  const itemsPerPage = 21;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { hour12: false });
    return `${day}-${month}-${year} ${time}`;
  };

  // Sample tender data
  const tenders = [
    {
      id: 1680,
      title: "PURCHASE OF STATIONERY ITEMS FOR MANDERA AIRSTRIP",
      entity: "KENYA AIRPORTS AUTHORITY",
      category: "Goods",
      method: "Request for Quotation",
      startDate: "13/11/2025 11:00:00",
      endDate: "20/11/2025 11:00:00",
      status: "active",
      refNo: "KAA/923/RFQ/0078/2025-26"
    },
    {
      id: 1778,
      title: "TENDER FOR SUPPLY AND DELIVERY OF CHOIR UNIFORMS",
      entity: "5073 COUNTY ASSEMBLY OF KISUMU",
      category: "Goods",
      method: "Request for Quotation",
      startDate: "07/11/2025 13:01:00",
      endDate: "14/11/2025 11:00:00",
      status: "active",
      refNo: "CAKSM/1777/RFQ/0009/2025-26"
    },
    {
      id: 1771,
      title: "REQUISITION FOR GROUP PERSONAL ACCIDENT (GPA)",
      entity: "NAIROBI INTERNATIONAL FINANCIAL CENTRE AUTHORITY",
      category: "Non Consultancy Services",
      method: "Request for Quotation",
      startDate: "07/11/2025 15:30:00",
      endDate: "14/11/2025 11:00:00",
      status: "active",
      refNo: "NIFC/949/RFQ/0003/2025-26"
    },
    {
      id: 1001,
      title: "PROVISION OF CONSULTING SERVICES FOR DIGITAL TRANSFORMATION",
      entity: "MINISTRY OF INFORMATION AND TECHNOLOGY",
      category: "Consultancy Services",
      method: "Open Tender",
      startDate: "15/11/2025 09:00:00",
      endDate: "20/12/2025 14:00:00",
      status: "active",
      refNo: "PE/1001/2025-26"
    },
    {
      id: 1002,
      title: "SUPPLY AND DELIVERY OF MEDICAL EQUIPMENT",
      entity: "NATIONAL HEALTH AUTHORITY",
      category: "Goods",
      method: "Request for Quotation",
      startDate: "18/11/2025 10:30:00",
      endDate: "05/12/2025 16:00:00",
      status: "active",
      refNo: "PE/1002/2025-26"
    },
    {
      id: 1003,
      title: "CONSTRUCTION OF COMMUNITY CENTER",
      entity: "COUNTY GOVERNMENT OF NAIROBI",
      category: "Works",
      method: "Open Tender",
      startDate: "20/11/2025 08:00:00",
      endDate: "15/01/2026 12:00:00",
      status: "active",
      refNo: "PE/1003/2025-26"
    },
    {
      id: 1004,
      title: "PROVISION OF CLEANING AND JANITORIAL SERVICES",
      entity: "STATE DEPARTMENT OF HOUSING",
      category: "Non Consultancy Services",
      method: "Framework Contract",
      startDate: "22/11/2025 09:00:00",
      endDate: "10/12/2025 15:00:00",
      status: "active",
      refNo: "PE/1004/2025-26"
    },
    {
      id: 1005,
      title: "SUPPLY OF OFFICE FURNITURE AND EQUIPMENT",
      entity: "MINISTRY OF EDUCATION",
      category: "Goods",
      method: "Request for Quotation",
      startDate: "25/11/2025 10:00:00",
      endDate: "08/12/2025 14:00:00",
      status: "active",
      refNo: "PE/1005/2025-26"
    }
  ];

  // Generate more tenders
  const allTenders = [...Array(264)].map((_, i) => ({
    ...tenders[i % tenders.length],
    id: 1001 + i,
    title: `${tenders[i % tenders.length].title}${i >= tenders.length ? ` - LOT ${Math.floor(i / tenders.length) + 1}` : ''}`,
    refNo: `${tenders[i % tenders.length].refNo.split('/')[0]}/${1001 + i}/RFQ/${String(i).padStart(4, '0')}/2025-26`
  }));

  const filteredTenders = allTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tender.category === selectedCategory;
    const matchesEntity = !selectedEntity || tender.entity.toLowerCase().includes(selectedEntity.toLowerCase());
    const matchesTenderNo = !tenderNo || tender.id.toString().includes(tenderNo);
    
    return matchesSearch && matchesCategory && matchesEntity && matchesTenderNo;
  });

  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentTenders = filteredTenders.slice(startIdx, startIdx + itemsPerPage);

  const categories = ['Goods', 'Works', 'Consultancy Services', 'Non Consultancy Services'];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedEntity('');
    setTenderNo('');
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    const showPages = 7;
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        «
      </button>
    );

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)} className="px-4 py-2 hover:bg-gray-100 rounded">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="px-2 text-gray-400">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded font-medium transition-all ${
            currentPage === i
              ? 'bg-amber-500 text-white shadow-md'
              : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="px-2 text-gray-400">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="px-4 py-2 hover:bg-gray-100 rounded">
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        »
      </button>
    );

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-400" />
              <span className="font-mono">{formatDateTime(currentTime)}</span>
            </div>
            <a href="mailto:support@procurement.go.ke" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Mail size={15} /> support@procurement.go.ke
            </a>
            <a href="tel:+254202252299" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Phone size={15} /> +254 20 2252299
            </a>
          </div>
          <select className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-green-500">
            <option>English</option>
            <option>Swahili</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 via-black to-green-600 rounded-lg shadow-lg flex items-center justify-center">
                <Building2 className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">e-GP Kenya</h1>
                <p className="text-xs text-gray-600">Government of Kenya</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User size={18} />
                <span className="font-medium">Home</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium">Help & Support</span>
                <ChevronDown size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium">About</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium">Register as Supplier</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md">
                <User size={18} />
                Login
              </button>
            </div>

            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-green-600 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex overflow-x-auto">
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap border-b-3 border-white bg-green-700">
                Tenders
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                Contracts
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                Procuring Entities
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                Suppliers
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                Procurement Plans
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                Disposal Plans
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                e-Auction
              </button>
              <button className="px-6 py-3.5 text-white font-medium whitespace-nowrap hover:bg-green-700 transition-colors">
                e-Catalogue
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="hidden xl:block w-72 bg-green-600 text-white min-h-screen">
          <div className="p-4 space-y-2">
            <button className="w-full text-left px-4 py-3 hover:bg-green-700 rounded-lg transition-colors font-medium flex items-center justify-between">
              User Manuals
              <ChevronDown size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-700 rounded-lg transition-colors font-medium">
              News & Events
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-700 rounded-lg transition-colors font-medium flex items-center justify-between">
              Training Videos
              <ChevronDown size={18} />
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-green-700 rounded-lg transition-colors font-medium">
              Supplier Training Registration
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main ref={contentRef} className="flex-1 px-4 py-6 lg:px-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Tenders</h2>
          </div>

          {/* Advanced Search Section */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-t-lg"
            >
              <div className="flex items-center gap-3">
                <Search size={22} className="text-gray-600" />
                <span className="text-lg font-semibold text-gray-900">Search</span>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>

            {showFilters && (
              <div className="p-6 border-t space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Procuring Entity :
                    </label>
                    <input
                      type="text"
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      placeholder="Enter entity name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Procurement Category :
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    >
                      <option value="">Please Select Procurement Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tender No. :
                    </label>
                    <input
                      type="text"
                      value={tenderNo}
                      onChange={(e) => setTenderNo(e.target.value)}
                      placeholder="Enter tender number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleSearch}
                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                  >
                    Search
                  </button>
                  <button 
                    onClick={handleClear}
                    className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3.5 font-semibold transition-colors relative ${
                  activeTab === 'active'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Active ({filteredTenders.length})
                {activeTab === 'active' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('closed')}
                className={`px-6 py-3.5 font-semibold transition-colors relative ${
                  activeTab === 'closed'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Closed
                {activeTab === 'closed' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('terminated')}
                className={`px-6 py-3.5 font-semibold transition-colors relative ${
                  activeTab === 'terminated'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Terminated
                {activeTab === 'terminated' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('opened')}
                className={`px-6 py-3.5 font-semibold transition-colors relative ${
                  activeTab === 'opened'
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Opened Bid(s)
                {activeTab === 'opened' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                )}
              </button>
            </div>
          </div>

          {/* Tender List */}
          <div className="space-y-4">
            {currentTenders.map((tender, index) => (
              <div key={tender.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <div className="p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {startIdx + index + 1}) {tender.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-x-4">
                          <div>
                            <span className="text-gray-600">Tender ID : </span>
                            <span className="font-semibold text-gray-900">{tender.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tender Reference No. : </span>
                            <span className="font-semibold text-gray-900">{tender.refNo}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-600">Tender Title :</span>
                          <span className="text-gray-900 ml-1">{tender.title}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <Building2 size={16} className="text-gray-500 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Procuring Entity :</span>
                            <span className="font-semibold text-gray-900 ml-1">{tender.entity}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <FileText size={16} className="text-gray-500 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Procurement Category :</span>
                            <span className="text-gray-900 ml-1">{tender.category}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Tag size={16} className="text-gray-500 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Procurement method :</span>
                            <span className="text-gray-900 ml-1">{tender.method}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Calendar size={16} className="text-gray-500 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Tender Start Date & Time : </span>
                            <span className="text-gray-900">{tender.startDate}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Calendar size={16} className="text-red-500 mt-0.5" />
                          <div>
                            <span className="text-gray-600">Tender End Date & Time : </span>
                            <span className="text-gray-900">{tender.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors font-medium whitespace-nowrap">
                      <Eye size={18} />
                      View Tender Notice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                {startIdx + 1} - {Math.min(startIdx + itemsPerPage, filteredTenders.length)}
              </div>
              
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="px-4 py-1.5 bg-white border border-amber-500 text-amber-600 rounded hover:bg-amber-50 transition-colors text-sm font-medium"
                >
                  Go to page
                </button>
              </div>

              <div className="flex items-center gap-1">
                {renderPagination()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:support@egpkenya.go.ke" className="hover:text-green-600">support@egpkenya.go.ke</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:info@egpkenya.go.ke" className="hover:text-green-600">info@egpkenya.go.ke</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  <a href="tel:+254202252299" className="hover:text-green-600">+254 20 2252299</a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>The National Treasury<br />Harambee Avenue, Treasury Building<br />P.O Box 30007-0010<br />Nairobi Tel. +254 20 225229</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Help Desk</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><button className="hover:text-green-600 transition-colors">Help Desk Online Form</button></li>
                <li><button className="hover:text-green-600 transition-colors">Feedback Online Form</button></li>
                <li><button className="hover:text-green-600 transition-colors">Supplier Training Registration</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Additional Links</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><button className="hover:text-green-600 transition-colors">Terms & Conditions</button></li>
                <li><button className="hover:text-green-600 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-green-600 transition-colors">Disclaimer</button></li>
                <li><button className="hover:text-green-600 transition-colors">Cookies Policy</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><button className="hover:text-green-600 transition-colors">Frequently Asked Questions</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
            <p>Last updated On : 07-01-2025 | Version No.: V1.0.18.4 | The National Treasury of Kenya © 2024 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProcurementPortal;