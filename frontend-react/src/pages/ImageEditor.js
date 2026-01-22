import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaDownload, FaRedo, FaMagic, FaSlidersH, FaFolderOpen } from 'react-icons/fa';
import axios from 'axios';

const ImageEditor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [filters, setFilters] = useState([]);
  const [currentParams, setCurrentParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fileName, setFileName] = useState('');
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = 'http://localhost:5000/api';

  // Load filters on component mount
  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-filters`);
      setFilters(response.data.filters);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.filters.map(filter => filter.category))];
      setCategories(['all', ...uniqueCategories]);
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUploadedFilename(response.data.filename);
        setFileName(response.data.original_name);
        const imageUrl = URL.createObjectURL(file);
        setOriginalImage(imageUrl);
        setFilteredImage(imageUrl); // Set both images to the same initially

        // Apply the original filter immediately to ensure both show the same image
        setTimeout(() => {
          applyFilter();
        }, 100);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = async () => {
    if (!uploadedFilename) return;

    setIsLoading(true);

    try {
      if (selectedFilter === 'original') {
        // If original filter is selected, just show the original image
        setFilteredImage(originalImage);
      } else {
        const response = await axios.post(`${API_URL}/apply-filter`, {
          filename: uploadedFilename,
          filter: selectedFilter,
          params: currentParams,
        });

        if (response.data.success) {
          setFilteredImage(response.data.image);
        } else {
          console.error('Error applying filter:', response.data.error);
        }
      }
    } catch (error) {
      console.error('Error applying filter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!filteredImage) return;

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = filteredImage;
    link.download = `filtered_image_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImage = async () => {
    if (uploadedFilename) {
      try {
        await axios.delete(`${API_URL}/cleanup/${uploadedFilename}`);
      } catch (error) {
        console.error('Error cleaning up:', error);
      }
    }

    setOriginalImage(null);
    setFilteredImage(null);
    setSelectedFilter('original');
    setCurrentParams({});
    setUploadedFilename(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter.id);
    setCurrentParams({});

    // Reset parameter values if filter has parameters
    if (filter.params && filter.params.length > 0) {
      const newParams = {};
      filter.params.forEach(param => {
        newParams[param.name] = param.default || param.min;
      });
      setCurrentParams(newParams);
    }

    // Apply the filter immediately when selected
    if (uploadedFilename) {
      if (filter.id === 'original') {
        // If original filter is selected, just show the original image
        setFilteredImage(originalImage);
      } else {
        applyFilter();
      }
    }
  };

  const updateParam = (name, value) => {
    setCurrentParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));

    // Automatically apply the filter when parameters change
    if (uploadedFilename) {
      if (selectedFilter === 'original') {
        // If original filter is selected, no need to apply anything
        setFilteredImage(originalImage);
      } else {
        applyFilter();
      }
    }
  };

  const filteredFilters = selectedCategory === 'all' 
    ? filters 
    : filters.filter(f => f.category === selectedCategory);

  const getFilterIcon = (category) => {
    const icons = {
      'basic': 'fas fa-adjust',
      'color': 'fas fa-palette',
      'blackwhite': 'fas fa-circle-half-stroke',
      'blur': 'fas fa-water',
      'edge': 'fas fa-vector-square',
      'artistic': 'fas fa-paint-brush',
      'vintage': 'fas fa-film',
      'special': 'fas fa-magic',
      'enhancement': 'fas fa-star',
      'distortion': 'fas fa-expand',
      'light': 'fas fa-sun'
    };
    return icons[category] || 'fas fa-image';
  };

  // Define Persian translations for filters
  const getFilterNameInPersian = (filterName) => {
    const persianNames = {
      'original': 'تصویر اصلی',
      'grayscale': 'سیاه و سفید',
      'sepia': 'سپیا',
      'negative': 'نگاتیو',
      'brightness': 'روشنایی',
      'contrast': 'کنتراست',
      'warm': 'گرم',
      'cool': 'سرد',
      'vintage': 'وینتیج',
      'cyberpunk': 'سایبرپانک',
      'sunset': 'غروب',
      'night': 'شب',
      'autumn': 'پاییز',
      'spring': 'بهار',
      'purple_haze': 'مه بنفش',
      'golden_hour': 'ساعت طلایی',
      'neon': 'نئون',
      'pastel': 'پاستل',
      'duotone': 'دو رنگ',
      'tritone': 'سه رنگ',
      'hue_shift': 'تغییر رنگ',
      'saturation': 'اشباع رنگ',
      'vibrance': 'جذابیت رنگ',
      'color_balance': 'تعادل رنگ',
      'bw_high_contrast': 'سیاه سفید کنتراست بالا',
      'bw_low_contrast': 'سیاه سفید کنتراست پایین',
      'bw_red_filter': 'سیاه سفید فیلتر قرمز',
      'bw_green_filter': 'سیاه سفید فیلتر سبز',
      'bw_blue_filter': 'سیاه سفید فیلتر آبی',
      'bw_orange_filter': 'سیاه سفید فیلتر نارنجی',
      'bw_yellow_filter': 'سیاه سفید فیلتر زرد',
      'ansel_adams': 'سبک انسل آدامز',
      'film_noir': 'فیلم نوآر',
      'infrared': 'مادون قرمز',
      'gaussian_blur': 'محو گاوسی',
      'motion_blur': 'محو حرکتی',
      'box_blur': 'محو جعبه‌ای',
      'radial_blur': 'محو شعاعی',
      'zoom_blur': 'محو زوم',
      'tilt_shift': 'تیلت شیفت',
      'lens_blur': 'محو لنز',
      'surface_blur': 'محو سطحی',
      'sobel': 'تشخیص لبه سوبل',
      'canny': 'تشخیص لبه کنی',
      'laplacian': 'تشخیص لبه لاپلاسین',
      'prewitt': 'تشخیص لبه پرویت',
      'roberts': 'تشخیص لبه رابرتس',
      'emboss': 'برجسته',
      'oil_painting': 'نقاشی رنگ روغن',
      'pencil_sketch': 'طراحی با مداد',
      'colored_pencil': 'مداد رنگی',
      'cartoon': 'کارتونی',
      'watercolor': 'آبرنگ',
      'pointillism': 'نقطه‌چینی',
      'impressionist': 'امپرسیونیست',
      'pop_art': 'پاپ آرت',
      'comic_book': 'کتاب کمیک',
      'mosaic': 'موزاییک',
      'stained_glass': 'شیشه رنگی',
      'vintage_film': 'فیلم قدیمی',
      'kodachrome': 'کداکروم',
      'polaroid': 'پولاروید',
      'lomo': 'لومو',
      'cross_process': 'کراس پروسس',
      'faded_film': 'فیلم رنگ پریده',
      'old_photo': 'عکس قدیمی',
      'daguerreotype': 'داگرئوتایپ',
      'hdr': 'HDR',
      'glamour': 'گلامور',
      'dramatic': 'دراماتیک',
      'dreamy': 'رویایی',
      'ethereal': 'اثیری',
      'grunge': 'گرانج',
      'rainbow': 'رنگین کمان',
      'thermal': 'حرارتی',
      'xray': 'اشعه ایکس',
      'matrix': 'ماتریکس',
      'sharpen': 'تیز کردن',
      'denoise': 'حذف نویز',
      'histogram_eq': 'بهبود کنتراست',
      'clahe': 'CLAHE',
      'unsharp_mask': 'Unsharp Mask',
      'edge_preserve': 'صاف با حفظ لبه',
      'fisheye': 'چشم ماهی',
      'barrel_distortion': 'دیستورشن بشکه‌ای',
      'pincushion': 'دیستورشن بالشتکی',
      'wave': 'موج',
      'swirl': 'چرخش',
      'pixelate': 'پیکسلی',
      'crystallize': 'کریستالی',
      'vignette': 'وینیت',
      'light_leak': 'نشت نور',
      'lens_flare': 'فلر لنز',
      'sun_rays': 'پرتوهای خورشید',
      'soft_light': 'نور نرم',
      'hard_light': 'نور سخت'
    };
    return persianNames[filterName] || filterName;
  };

  return (
    <div className="min-h-screen">
      {/* Upload Section */}
      {!originalImage && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="border-2 border-dashed border-accent-primary rounded-2xl p-12 text-center cursor-pointer hover:bg-dark-card transition-colors w-full max-w-md"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaUpload className="text-accent-primary text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Upload Your Image</h3>
            <p className="text-gray-400 mb-6">Click or drag and drop your image here</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, BMP (Max 10MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </motion.div>
      )}

      {/* Main Editor */}
      {originalImage && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Image Display Panel */}
          <div className="lg:w-1/2 sticky top-4 self-start">
            <div className="grid md:grid-cols-1 gap-8">
              <div className="card glass-effect overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaFolderOpen className="mr-2 text-accent-primary" /> Original Image
                  </h3>
                  <span className="text-sm text-gray-400">{fileName}</span>
                </div>
                <div className="aspect-square flex items-center justify-center bg-dark-card rounded-lg overflow-hidden">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              <div className="card glass-effect overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaMagic className="mr-2 text-accent-primary" /> Filtered Image
                  </h3>
                  <span className="text-sm text-gray-400 capitalize">{selectedFilter.replace(/_/g, ' ')}</span>
                </div>
                <div className="aspect-square flex items-center justify-center bg-dark-card rounded-lg overflow-hidden">
                  {(filteredImage && selectedFilter !== 'original') ? (
                    <img
                      src={filteredImage}
                      alt="Filtered"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : originalImage ? (
                    <img
                      src={originalImage}
                      alt="Original (no filter applied)"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-500">Apply a filter to see the result</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Filters Section */}
          <div className="lg:w-1/2">
            <div className="card glass-effect mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <FaMagic className="mr-2 text-accent-primary" /> Select Filter
              </h3>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg'
                        : 'bg-dark-card text-gray-300 hover:bg-accent-primary hover:text-dark-bg'
                    }`}
                  >
                    {category === 'all' ? 'All' :
                     category === 'basic' ? 'Basic' :
                     category === 'color' ? 'Color' :
                     category === 'blackwhite' ? 'Black & White' :
                     category === 'blur' ? 'Blur' :
                     category === 'edge' ? 'Edge Detection' :
                     category === 'artistic' ? 'Artistic' :
                     category === 'vintage' ? 'Vintage' :
                     category === 'special' ? 'Special' :
                     category === 'enhancement' ? 'Enhancement' :
                     category === 'distortion' ? 'Distortion' :
                     category === 'light' ? 'Light' :
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {filteredFilters.map((filter) => (
                  <motion.div
                    key={filter.id}
                    className={`filter-card text-center p-4 cursor-pointer rounded-lg transition-all ${
                      selectedFilter === filter.id
                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg'
                        : 'bg-dark-card'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectFilter(filter)}
                  >
                    <div className="text-lg mb-2">
                      <i className={getFilterIcon(filter.category)}></i>
                    </div>
                    <div className="text-xs font-medium">{filter.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{filter.id}</div>
                  </motion.div>
                ))}
              </div>

              {/* Parameters */}
              {filters.find(f => f.id === selectedFilter)?.params &&
               filters.find(f => f.id === selectedFilter).params.length > 0 && (
                <div className="bg-dark-card rounded-lg p-4 mb-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <FaSlidersH className="mr-2 text-accent-primary" /> Parameters
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filters.find(f => f.id === selectedFilter)?.params?.map((param) => (
                      <div key={param.name} className="space-y-2">
                        <label className="block text-sm font-medium">
                          {param.name === 'factor' ? 'Factor' :
                           param.name === 'kernel_size' ? 'Kernel Size' :
                           param.name === 'shift' ? 'Shift' :
                           param.name === 'strength' ? 'Strength' :
                           param.name === 'size' ? 'Size' :
                           param.name === 'threshold1' ? 'Threshold 1' :
                           param.name === 'threshold2' ? 'Threshold 2' :
                           param.name === 'radius' ? 'Radius' :
                           param.name === 'angle' ? 'Angle' :
                           param.name === 'focus_height' ? 'Focus Height' :
                           param.name === 'threshold' ? 'Threshold' :
                           param.name === 'dot_size' ? 'Dot Size' :
                           param.name === 'brush_size' ? 'Brush Size' :
                           param.name === 'levels' ? 'Levels' :
                           param.name === 'block_size' ? 'Block Size' :
                           param.name === 'segments' ? 'Segments' :
                           param.name === 'clipLimit' ? 'Clip Limit' :
                           param.name === 'tileGridSize' ? 'Tile Grid Size' :
                           param.name === 'amount' ? 'Amount' :
                           param.name === 'red' ? 'Red' :
                           param.name === 'green' ? 'Green' :
                           param.name === 'blue' ? 'Blue' :
                           param.name === 'sigma_s' ? 'Sigma S' :
                           param.name === 'sigma_r' ? 'Sigma R' :
                           param.name === 'k' ? 'K Factor' :
                           param.name === 'amplitude' ? 'Amplitude' :
                           param.name === 'frequency' ? 'Frequency' :
                           param.name === 'pixel_size' ? 'Pixel Size' :
                           param.name === 'center_x' ? 'Center X' :
                           param.name === 'center_y' ? 'Center Y' :
                           param.name === 'num_rays' ? 'Number of Rays' :
                           param.name} ({currentParams[param.name] || param.default || param.min})
                        </label>
                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          step={param.step || 0.1}
                          value={currentParams[param.name] || param.default || param.min}
                          onChange={(e) => updateParam(param.name, e.target.value)}
                          className="w-full accent-accent-primary"
                        />
                        <div className="text-xs text-gray-400">
                          Range: {param.min} - {param.max}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={applyFilter}
                  disabled={isLoading}
                  className="btn-primary flex items-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FaMagic className="mr-2" />
                  )}
                  Apply Filter
                </button>
                
                <button
                  onClick={downloadImage}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-dark-bg flex items-center"
                >
                  <FaDownload className="mr-2" /> Download
                </button>
                
                <button
                  onClick={resetImage}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 border-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-dark-bg flex items-center"
                >
                  <FaRedo className="mr-2" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-8 rounded-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
            <p className="text-lg">Processing image...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;