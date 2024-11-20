import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Share2, Star, User, Calendar, Eye, Tag as TagIcon, FileText, FileIcon, File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundDecorations from '../components/background-decorations';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';


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
    font-weight: bold;
    margin-right: 1.5rem !important;
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

const ResourcePage = () => {
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const editorInstance = useRef(null);

  const editorData = {
    time: new Date().getTime(),
    version: "2.30.7",
    blocks: [
      {
        id: "header-1",
        type: "header",
        data: {
          text: "Advanced UI Components Pack Documentation",
          level: 2
        }
      },
      {
        id: "intro-paragraph",
        type: "paragraph",
        data: {
          text: "Welcome to the comprehensive documentation for our Advanced UI Components Pack. This package provides a robust set of React components designed to accelerate your web development process while maintaining high standards of accessibility and performance."
        }
      },
      {
        id: "features-header",
        type: "header",
        data: {
          text: "Key Features",
          level: 3
        }
      },
      {
        id: "features-list",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "50+ Customizable React Components",
            "Tailwind CSS Integration",
            "Responsive Design System",
            "Accessibility Compliant (WCAG 2.1)",
            "Dark Mode Support",
            "TypeScript Definitions",
            "Comprehensive Documentation"
          ]
        }
      },
      {
        id: "installation-header",
        type: "header",
        data: {
          text: "Installation Guide",
          level: 3
        }
      },
      {
        id: "installation-code",
        type: "code",
        data: {
          code: "npm install @ui/advanced-components\n# or\nyarn add @ui/advanced-components",
          language: "bash"
        }
      },
      {
        id: "usage-header",
        type: "header",
        data: {
          text: "Basic Usage",
          level: 3
        }
      },
      {
        id: "usage-code",
        type: "code",
        data: {
          code: "import { Button, Modal, Alert } from '@ui/advanced-components';\n\nfunction App() {\n  return (\n    <div>\n      <Button variant=\"primary\">Click Me</Button>\n      <Alert type=\"success\">Operation completed!</Alert>\n    </div>\n  );",
          language: "javascript"
        }
      },
      {
        id: "quote-block",
        type: "quote",
        data: {
          text: "Built with developers in mind, our components strike the perfect balance between flexibility and consistency.",
          caption: "Design System Team",
          alignment: "left"
        }
      },
      {
        id: "customization-header",
        type: "header",
        data: {
          text: "Customization",
          level: 3
        }
      },
      {
        id: "customization-paragraph",
        type: "paragraph",
        data: {
          text: "All components support customization through Tailwind CSS classes. You can extend or override the default styles using your tailwind.config.js file."
        }
      },
      {
        id: "example-header",
        type: "header",
        data: {
          text: "Example Implementation",
          level: 3
        }
      },
      {
        id: "example-code",
        type: "code",
        data: {
          code: "// Custom Button Example\n<Button\n  variant=\"custom\"\n  className=\"bg-gradient-to-r from-purple-500 to-pink-500\"\n  hover=\"hover:from-purple-600 hover:to-pink-600\"\n>\n  Gradient Button\n</Button>",
          language: "javascript"
        }
      },
      {
        id: "important-note",
        type: "paragraph",
        data: {
          text: "Important: Make sure to follow the version compatibility matrix when integrating with your React application. This package requires React 17.0.0 or higher."
        }
      },
      {
        id: "testing-header",
        type: "header",
        data: {
          text: "Testing",
          level: 3
        }
      },
      {
        id: "testing-paragraph",
        type: "paragraph",
        data: {
          text: "All components come with comprehensive test suites using Jest and React Testing Library. You can extend these tests for your custom implementations."
        }
      },
      {
        id: "testing-code",
        type: "code",
        data: {
          code: "import { render, fireEvent } from '@testing-library/react';\nimport { Button } from '@ui/advanced-components';\n\ntest('Button click handler', () => {\n  const handleClick = jest.fn();\n  const { getByText } = render(\n    <Button onClick={handleClick}>Test Button</Button>\n  );\n  fireEvent.click(getByText('Test Button'));\n  expect(handleClick).toHaveBeenCalled();\n});",
          language: "javascript"
        }
      },
      {
        id: "support-header",
        type: "header",
        data: {
          text: "Support and Updates",
          level: 3
        }
      },
      {
        id: "support-list",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Regular updates and bug fixes",
            "Community support through GitHub discussions",
            "Premium support options available",
            "Detailed changelog for each release"
          ]
        }
      }
    ]
  };

  // Mock data - replace with actual data from your backend
  const resource = {
    title: "Advanced UI Components Pack",
    author: "Sarah Parker",
    authorVerified: true,
    createdAt: "2024-03-15",
    downloads: 1234,
    description: editorData,
    views: 5678,
    rating: 4.8,
    totalRatings: 256,
    tags: ["React", "UI Components", "Tailwind CSS", "Frontend", "Design System"],
    resources: [
      { name: "components.zip", size: "2.4 MB", type: "application/zip" },
      { name: "documentation.pdf", size: "856 KB", type: "application/pdf" }
    ]
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = editorStyles;
    document.head.appendChild(styleSheet);

    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        readOnly: true,
        data: resource.description,
        tools: {
          header: {
            class: Header,
            config: {
              levels: [2, 3, 4],
              defaultLevel: 2
            }
          },
          list: List,
          code: Code,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true
          },
          quote: Quote,
          marker: Marker,
        },
        logLevel: 'ERROR',
        minHeight: 0
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'application/zip':
        return <File className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <FileIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const handleRating = (value) => {
    if (!isRated) {
      setRating(value);
      setIsRated(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-screen bg-gray-900 text-gray-200">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8"
        >
          <Link to="/" className="text-gray-400 hover:text-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Resource Details
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Title and Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-white">{resource.title}</h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link to={`users/${resource.author}`} className="flex items-center gap-2 text-gray-400 hover:text-gray-200">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">{resource.author}</span>
                  {resource.authorVerified && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-400/10 text-blue-400">
                      Verified
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-gray-700" />
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRating(star)}
                        className={`p-0.5 ${star <= rating ? 'text-yellow-500' : 'text-gray-600'} ${!isRated ? 'hover:text-yellow-500' : ''}`}
                        disabled={isRated}
                      >
                        <Star className="w-4 h-4" fill={star <= rating ? 'currentColor' : 'none'} />
                      </motion.button>
                    ))}
                  </div>
                  {isRated ? (
                    <span className="text-sm text-gray-400 ml-2">Thanks!</span>
                  ) : (
                    <span className="text-sm text-gray-400 ml-2">Rate this</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm bg-gray-800/50 text-gray-300"
              >
                <TagIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                {tag}
              </span>
            ))}
          </div>

          {/* Description with EditorJS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold">About</h3>
            <div
              id="editorjs"
              className="prose prose-invert max-w-none text-sm sm:text-base"
            />
          </motion.div>

          {/* Files Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold">Files</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-colors"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download All
              </motion.button>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {resource.resources.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 sm:p-3 bg-gray-700/50 rounded-xl group-hover:bg-gray-700 transition-colors">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <p className="text-sm sm:text-base font-medium truncate">{file.name}</p>
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-700/50 rounded-full">
                            {file.size}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs sm:text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            {file.downloads} downloads
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {new Date(file.lastModified).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-blue-600/20 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors"
                      >
                        Download
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;