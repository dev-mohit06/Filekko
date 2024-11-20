import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Tag as TagIcon, Eye, EyeOff, Upload, File, X, FileText, Image, Video, Music, Archive, Code as CD } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundDecorations from '../components/background-decorations';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';

const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
      shortcut: 'CMD+SHIFT+H'
    }
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
      shortcut: 'CMD+SHIFT+L'
    }
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: 'Start writing or press "/" for commands',
      preserveBlank: true
    }
  },
  code: {
    class: Code,
    config: {
      placeholder: 'Enter code',
      shortcut: 'CMD+SHIFT+C'
    }
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: 'Quote\'s author'
    }
  },
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M'
  }
};

const CreateResources = () => {
  const editorStyles = `
  /* Base Editor Container */
  .codex-editor {
    color: #e5e7eb !important;
    background: transparent !important;
  }

  .codex-editor__redactor {
    padding: 0 !important;
    margin-bottom: 2rem !important;
  }

  /* Content Area */
  .ce-block__content,
  .ce-toolbar__content {
    max-width: none !important;
    margin: 0 !important;
  }

  /* Paragraphs */
  .ce-paragraph {
    color: #e5e7eb !important;
    line-height: 1.75 !important;
    font-size: 1rem !important;
    margin-bottom: 1rem !important;
  }

  .ce-paragraph[data-placeholder]:empty::before {
    color: #6b7280 !important;
  }

  /* Headers */
  .ce-header {
    padding: 1rem 0 !important;
    margin: 0 !important;
    color: #f3f4f6 !important;
    font-weight: 600 !important;
  }

  h1.ce-header {
    font-size: 2rem !important;
    line-height: 2.5rem !important;
  }

  h2.ce-header {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
  }

  h3.ce-header {
    font-size: 1.25rem !important;
    line-height: 1.75rem !important;
  }

  /* Lists */
  .cdx-list {
    color: #e5e7eb !important;
    padding-left: 1.5rem !important;
    margin: 1rem 0 !important;
  }

  .cdx-list__item {
    padding: 0.375rem 0 !important;
    line-height: 1.625 !important;
  }

  /* Code Blocks - Enhanced */
  .ce-code {
    margin: 1.5rem 0 !important;
    position: relative !important;
  }

  .ce-code__textarea {
    background-color: #1f2937 !important;
    color: #e5e7eb !important;
    border: 1px solid #374151 !important;
    border-radius: 0.75rem !important;
    padding: 1.25rem !important;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    font-size: 0.875rem !important;
    line-height: 1.7 !important;
    width: 100% !important;
    min-height: 120px !important;
    resize: vertical !important;
    tab-size: 2 !important;
  }

  .ce-code__textarea:focus {
    outline: none !important;
    border-color: #60a5fa !important;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2) !important;
  }

  /* Quotes - Enhanced */
  .cdx-quote {
    margin: 2rem 0 !important;
    padding: 1.5rem 2rem !important;
    background-color: rgba(31, 41, 55, 0.5) !important;
    border-left: 4px solid #60a5fa !important;
    border-radius: 0 0.75rem 0.75rem 0 !important;
    position: relative !important;
  }

  .cdx-quote::before {
    content: '"' !important;
    position: absolute !important;
    top: -0.5rem !important;
    left: 1rem !important;
    font-size: 3rem !important;
    color: #60a5fa !important;
    opacity: 0.3 !important;
    font-family: Georgia, serif !important;
  }

  .cdx-quote__text {
    color: #e5e7eb !important;
    font-style: italic !important;
    font-size: 1.125rem !important;
    line-height: 1.75 !important;
    margin-bottom: 0.75rem !important;
    position: relative !important;
    z-index: 1 !important;
    border: none !important;
    min-height: auto !important;
  }

  .cdx-quote__caption {
    color: #9ca3af !important;
    font-size: 0.875rem !important;
    font-style: normal !important;
    position: relative !important;
    z-index: 1 !important;
    display: flex !important;
    align-items: center !important;
    border: none !important;
  }

  .cdx-quote__caption::before {
    content: '—' !important;
    margin-right: 0.5rem !important;
    color: #60a5fa !important;
  }

  /* Markers */
  .cdx-marker {
    background: rgba(255, 255, 0, 0.15) !important;
    padding: 0.125rem 0 !important;
  }

  /* Tables */
  .tc-table {
    border-radius: 0.5rem !important;
    overflow: hidden !important;
    margin: 1rem 0 !important;
  }

  .tc-row {
    border-bottom: 1px solid #374151 !important;
  }

  .tc-cell {
    border: 1px solid #374151 !important;
    padding: 0.75rem !important;
    background-color: #1f2937 !important;
    color: #e5e7eb !important;
  }

  /* Images */
  .image-tool {
    margin: 1.5rem 0 !important;
  }

  .image-tool__image {
    border-radius: 0.75rem !important;
    overflow: hidden !important;
  }

  .image-tool__caption {
    color: #9ca3af !important;
    font-size: 0.875rem !important;
    margin-top: 0.5rem !important;
    text-align: center !important;
  }

  /* Toolbar */
  .ce-toolbar__plus {
    color: #9ca3af !important;
    background-color: #374151 !important;
  }

  .ce-toolbar__plus:hover {
    background-color: #4b5563 !important;
  }

  .ce-toolbar__settings-btn {
    color: #9ca3af !important;
    background-color: #374151 !important;
  }

  .ce-toolbar__settings-btn:hover {
    background-color: #4b5563 !important;
  }

  /* Inline Tools */
  .ce-inline-toolbar {
    background-color: #1f2937 !important;
    border: 1px solid #374151 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  }

  .ce-inline-toolbar__buttons {
    padding: 0.25rem !important;
  }

  .ce-inline-tool {
    color: #e5e7eb !important;
    padding: 0.375rem !important;
    border-radius: 0.375rem !important;
  }

  .ce-inline-tool:hover {
    background-color: #374151 !important;
  }

  .ce-inline-tool--active {
    color: #60a5fa !important;
    background-color: #374151 !important;
  }

  /* Conversion Toolbar */
  .ce-conversion-toolbar {
    background-color: #1f2937 !important;
    border: 1px solid #374151 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  }

  .ce-conversion-tool {
    color: #e5e7eb !important;
    padding: 0.375rem !important;
    border-radius: 0.375rem !important;
  }

  .ce-conversion-tool:hover {
    background-color: #374151 !important;
  }

  .ce-conversion-tool--active {
    color: #60a5fa !important;
    background-color: #374151 !important;
  }

  /* Block Tunes */
  .ce-block__content--selected {
    background-color: rgba(59, 130, 246, 0.1) !important;
    border-radius: 0.5rem !important;
  }

  /* Settings Panel */
  .ce-settings {
    background-color: #1f2937 !important;
    border: 1px solid #374151 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  }

  .ce-settings__button {
    color: #e5e7eb !important;
    padding: 0.5rem !important;
  }

  .ce-settings__button:hover {
    background-color: #374151 !important;
  }

  .ce-settings__button--active {
    color: #60a5fa !important;
    background-color: #374151 !important;
  }
`;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public',
    tags: [],
    resources: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {

    const styleSheet = document.createElement("style");
    styleSheet.innerText = editorStyles;
    document.head.appendChild(styleSheet);

    if (!editorInstance.current && editorRef.current) {
      editorInstance.current = new EditorJS({
        holder: editorRef.current,
        tools: EDITOR_JS_TOOLS,
        placeholder: 'Tell your story...',
        data: {},
        style: {

        },
        onChange: async () => {
          const data = await editorInstance.current.save();
          setFormData(prev => ({
            ...prev,
            description: data
          }));
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.startsWith('text/')) return FileText;
    if (type.includes('zip') || type.includes('rar')) return Archive;
    if (type.includes('javascript') || type.includes('python')) return CD;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newResources = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));

    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, ...newResources]
    }));
  };

  const removeResource = (id) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter(resource => resource.id !== id)
    }));
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorInstance.current) {
      const editorData = await editorInstance.current.save();
      console.log({
        ...formData,
        description: editorData
      });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-screen bg-gray-900">
      <BackgroundDecorations />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/" className="text-gray-400 hover:text-gray-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Create Resource
          </h1>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full text-4xl font-bold border-none bg-transparent focus:outline-none focus:ring-0 p-0 placeholder-gray-600 text-white"
              placeholder="Title"
            />
          </motion.div>

          {/* Tags Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <TagIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTagAdd(e)}
                className="w-full pl-12 pr-4 py-2 bg-transparent rounded-xl focus:outline-none focus:border-transparent text-gray-200"
                placeholder="Add tags..."
              />
            </div>
          </motion.div>

          {/* Description Editor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[200px] prose prose-invert max-w-none"
          >
            <div ref={editorRef} className="border-none focus:outline-none text-gray-200" />
          </motion.div>

          {/* Resource Upload Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 border-t border-gray-800 pt-6"
          >
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-6 border border-gray-700 rounded-xl hover:bg-gray-800/50 transition-colors focus:outline-none"
              >
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm text-gray-300">Click to upload</p>
                    <p className="text-xs text-gray-500">Support for multiple files</p>
                  </div>
                </div>
              </button>
            </div>

            {/* File List */}
            <AnimatePresence>
              {formData.resources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  {formData.resources.map((resource) => {
                    const FileIcon = getFileIcon(resource.type);
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="p-2 bg-gray-700 rounded-lg">
                            <FileIcon className="w-5 h-5 text-gray-300" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate text-gray-200">{resource.name}</p>
                            <p className="text-xs text-gray-400">{formatFileSize(resource.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeResource(resource.id)}
                          className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Visibility and Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between border-t border-gray-800 pt-6"
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, visibility: 'public' }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${formData.visibility === 'public'
                  ? 'bg-gray-800 text-gray-200'
                  : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
              >
                <Eye className="w-4 h-4" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, visibility: 'private' }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${formData.visibility === 'private'
                  ? 'bg-gray-800 text-gray-200'
                  : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
              >
                <EyeOff className="w-4 h-4" />
                Private
              </button>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-colors"
            >
              Publish
            </button>
          </motion.div>
        </form>
      </div>

      <style jsx global>{
        `
       /* Editor.js toolbar styling with gradients */
        .ce-toolbar__plus {
          background: rgba(37, 99, 235, 0.1) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                      0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          color: white !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .codex-editor__redactor{
          padding-bottom: 0px !important;
        }
        
         /* Popover container styling */
        .ce-popover__container {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.03),
            rgba(147, 51, 234, 0.03),
            rgba(236, 72, 153, 0.03)
          ) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          overflow: hidden !important;
          margin-top: 8px !important;
        }

        /* Popover items container */
        .ce-popover__items {
          padding: 6px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
        }

        /* Individual popover item */
        .ce-popover-item {
          position: relative !important;
          background: rgba(37, 99, 235, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
          padding: 8px 12px !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          overflow: hidden !important;
        }

        /* Gradient overlay for items */
        .ce-popover-item::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.1),
            rgba(147, 51, 234, 0.1)
          ) !important;
          z-index: 0 !important;
          transition: opacity 0.2s ease !important;
          opacity: 0 !important;
        }

        .ce-popover-item:hover::before {
          opacity: 1 !important;
        }

        .ce-popover-item:hover {
          background: rgba(37, 99, 235, 0.15) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        }

        /* Icon styling */
        .ce-popover-item__icon {
          position: relative !important;
          z-index: 1 !important;
          width: 24px !important;
          height: 24px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: rgba(255, 255, 255, 0.9) !important;
          background: transparent !important;
        }

        /* Title styling */
        .ce-popover-item__title {
          position: relative !important;
          z-index: 1 !important;
          color: rgba(255, 255, 255, 0.9) !important;
          font-size: 0.9rem !important;
          font-weight: 500 !important;
          margin: 0 !important;
        }

        /* Nothing found message */
        .ce-popover__nothing-found-message {
          color: rgba(255, 255, 255, 0.5) !important;
          font-size: 0.875rem !important;
          padding: 12px 16px !important;
          text-align: center !important;
        }

        /* Plus button styling (keeping consistent with popover) */
        .ce-toolbar__plus {
          background: rgba(37, 99, 235, 0.1) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                      0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          color: white !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }
        
        .ce-toolbar__plus::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.2),
            rgba(147, 51, 234, 0.2)
          ) !important;
          z-index: -1 !important;
          opacity: 0 !important;
          transition: opacity 0.2s ease !important;
        }
        
        .ce-toolbar__plus:hover::before {
          opacity: 1 !important;
        }

        .ce-toolbar__plus:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.2),
                      0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          background: rgba(37, 99, 235, 0.15) !important;
        }
        
        .ce-toolbar__plus:active {
          transform: translateY(0) !important;
        }

        /* Consistent scrollbar styling */
        .ce-popover__items {
          scrollbar-width: thin !important;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent !important;
        }

        .ce-popover__items::-webkit-scrollbar {
          width: 4px !important;
        }

        .ce-popover__items::-webkit-scrollbar-track {
          background: transparent !important;
        }

        .ce-popover__items::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2) !important;
          border-radius: 20px !important;
        }

        .ce-popover__search{
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default CreateResources;