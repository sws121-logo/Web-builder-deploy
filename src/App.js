import React, { useState, createContext, useContext, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ArrowUp, ArrowDown, Trash2, PlusCircle, ShoppingCart, User, Search, Menu, X, Image as ImageIcon, Type, Code, Layout } from 'lucide-react';

// --- MOCK DATA FOR TEMPLATES ---
const templates = [
    // E-commerce
    { id: 1, name: 'Modern E-Store', category: 'E-commerce', thumbnail: 'https://placehold.co/400x300/d1d4f9/4f46e5?text=Modern+E-Store', },
    { id: 2, name: 'Classic Boutique', category: 'E-commerce', thumbnail: 'https://placehold.co/400x300/f5d0fe/86198f?text=Classic+Boutique', },
    { id: 3, name: 'Gadget Hub', category: 'E-commerce', thumbnail: 'https://placehold.co/400x300/a7f3d0/047857?text=Gadget+Hub', },
    { id: 4, name: 'Book Nook', category: 'E-commerce', thumbnail: 'https://placehold.co/400x300/fef08a/854d0e?text=Book+Nook', },
    { id: 5, name: 'Fashion Forward', category: 'E-commerce', thumbnail: 'https://placehold.co/400x300/fecaca/991b1b?text=Fashion+Forward', },
    // Business
    { id: 6, name: 'Corporate Solutions', category: 'Business', thumbnail: 'https://placehold.co/400x300/bae6fd/0c4a6e?text=Corporate', },
    { id: 7, name: 'Creative Agency', category: 'Business', thumbnail: 'https://placehold.co/400x300/f5d0fe/86198f?text=Creative+Agency', },
    { id: 8, name: 'Startup Launch', category: 'Business', thumbnail: 'https://placehold.co/400x300/d1d4f9/4f46e5?text=Startup+Launch', },
    { id: 9, name: 'Consulting Firm', category: 'Business', thumbnail: 'https://placehold.co/400x300/a7f3d0/047857?text=Consulting', },
    { id: 10, name: 'Local Services', category: 'Business', thumbnail: 'https://placehold.co/400x300/fef08a/854d0e?text=Local+Services', },
    // Blog
    { id: 11, name: 'Travel Diaries', category: 'Blog', thumbnail: 'https://placehold.co/400x300/fecaca/991b1b?text=Travel+Blog', },
    { id: 12, name: 'Foodie Finds', category: 'Blog', thumbnail: 'https://placehold.co/400x300/bae6fd/0c4a6e?text=Foodie+Finds', },
    { id: 13, name: 'Tech Today', category: 'Blog', thumbnail: 'https://placehold.co/400x300/f5d0fe/86198f?text=Tech+Today', },
    { id: 14, name: 'Personal Growth', category: 'Blog', thumbnail: 'https://placehold.co/400x300/d1d4f9/4f46e5?text=Personal+Growth', },
    { id: 15, name: 'Lifestyle Weekly', category: 'Blog', thumbnail: 'https://placehold.co/400x300/a7f3d0/047857?text=Lifestyle+Weekly', },
    // Portfolio
    { id: 16, name: 'Photographer\'s Folio', category: 'Portfolio', thumbnail: 'https://placehold.co/400x300/fef08a/854d0e?text=Photographer', },
    { id: 17, name: 'Developer Desk', category: 'Portfolio', thumbnail: 'https://placehold.co/400x300/fecaca/991b1b?text=Developer+Desk', },
    { id: 18, name: 'Graphic Designer', category: 'Portfolio', thumbnail: 'https://placehold.co/400x300/bae6fd/0c4a6e?text=Graphic+Designer', },
    { id: 19, name: 'Writer\'s Corner', category: 'Portfolio', thumbnail: 'https://placehold.co/400x300/f5d0fe/86198f?text=Writer\'s+Corner', },
    { id: 20, name: 'Architect\'s Vision', category: 'Portfolio', thumbnail: 'https://placehold.co/400x300/d1d4f9/4f46e5?text=Architect', },
];

const initialTemplateData = {
    header: {
        siteTitle: 'My Website',
        navLinks: ['Home', 'About', 'Contact'],
        icons: {
            cart: false,
            profile: false,
            search: false,
        },
    },
    body: [
        { id: 'section-1', type: 'hero', title: 'Welcome to Your New Website', subtitle: 'This is a hero section. You can edit this text.', imageUrl: 'https://placehold.co/1200x600/e0e7ff/4338ca?text=Hero+Image' },
        { id: 'section-2', type: 'text', title: 'About Us', content: 'This is a text section. Describe your business, blog, or portfolio here. Click to edit.' },
        { id: 'section-3', type: 'gallery', title: 'Our Work', images: ['https://placehold.co/600x400/dbeafe/1e40af', 'https://placehold.co/600x400/d1fae5/065f46', 'https://placehold.co/600x400/fee2e2/991b1b'] },
    ],
    footer: {
        text: '© 2024 My Website. All rights reserved.',
        socialLinks: {
            twitter: '#',
            facebook: '#',
            instagram: '#',
        },
    },
};

// --- CONTEXT FOR STATE MANAGEMENT ---
const WebsiteContext = createContext();

const WebsiteProvider = ({ children, template }) => {
    const [websiteData, setWebsiteData] = useState(initialTemplateData);
    
    // In a real app, you would load different initial data based on the chosen template
    useEffect(() => {
        // This is a placeholder for template-specific data loading.
        // For this example, we'll just reset to the initial data but you could have
        // different JSON objects for each template.
        console.log(`Loading data for template: ${template.name}`);
        setWebsiteData(initialTemplateData);
    }, [template]);

    return (
        <WebsiteContext.Provider value={{ websiteData, setWebsiteData }}>
            {children}
        </WebsiteContext.Provider>
    );
};

// --- CHATBOT MODAL ---
const ChatbotModal = ({ isOpen, onClose }) => {
    const [topic, setTopic] = useState('tech');
    const [content, setContent] = useState('');

    const chatbotContent = {
        tech: [
            "Leveraging AI to streamline your workflow.",
            "The future of quantum computing and its impact.",
            "Top 5 JavaScript frameworks for modern web development.",
            "Building scalable applications with microservices architecture."
        ],
        business: [
            "Effective marketing strategies for small businesses.",
            "The importance of customer relationship management (CRM).",
            "Financial planning tips for startups.",
            "How to build a strong brand identity."
        ],
        blog: [
            "Finding your niche: A guide for new bloggers.",
            "How to write engaging content that readers will love.",
            "SEO basics for bloggers: Getting your content discovered.",
            "Monetizing your blog: From ads to affiliate marketing."
        ],
        portfolio: [
            "Crafting a compelling 'About Me' section.",
            "Showcasing your projects with high-quality visuals.",
            "Writing effective case studies for your work.",
            "The importance of testimonials and social proof."
        ]
    };

    const generateContent = () => {
        const options = chatbotContent[topic];
        const randomIndex = Math.floor(Math.random() * options.length);
        setContent(options[randomIndex]);
    };

    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Content copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Content Helper</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Select a Topic:</label>
                        <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="tech">Tech</option>
                            <option value="business">Business</option>
                            <option value="blog">Blog</option>
                            <option value="portfolio">Portfolio</option>
                        </select>
                    </div>
                    <button onClick={generateContent} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                        Generate Idea
                    </button>
                    {content && (
                        <div className="bg-gray-100 p-4 rounded-md">
                            <p className="text-gray-800">{content}</p>
                            <button onClick={copyToClipboard} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- EDITABLE COMPONENTS ---
const EditableText = ({ value, onSave, element = 'p', className = '' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    const handleSave = () => {
        onSave(text);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className={`bg-white border border-indigo-500 rounded p-1 w-full ${className}`}
                autoFocus
            />
        );
    }

    const CustomTag = element;
    return <CustomTag onClick={() => setIsEditing(true)} className={`cursor-pointer hover:outline hover:outline-2 hover:outline-indigo-300 rounded p-1 ${className}`}>{value}</CustomTag>;
};

const EditableImage = ({ src, onSave, alt = '', className = '' }) => {
    const handleImageChange = () => {
        const newSrc = prompt("Enter new image URL:", src);
        if (newSrc) {
            onSave(newSrc);
        }
    };

    return (
        <div className="relative group cursor-pointer" onClick={handleImageChange}>
            <img src={src} alt={alt} className={`w-full h-auto object-cover rounded-md ${className}`} />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                <p className="text-white opacity-0 group-hover:opacity-100">Click to change image</p>
            </div>
        </div>
    );
};

// --- DRAG & DROP SECTION ---
const ItemType = 'SECTION';

const DraggableSection = ({ id, index, moveSection, children }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            moveSection(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="relative">
            {children}
        </div>
    );
};


// --- EDITOR COMPONENTS ---
const HeaderEditor = () => {
    const { websiteData, setWebsiteData } = useContext(WebsiteContext);

    const handleUpdate = (key, value) => {
        setWebsiteData(prev => ({
            ...prev,
            header: { ...prev.header, [key]: value },
        }));
    };
    
    const handleIconToggle = (icon) => {
        setWebsiteData(prev => ({
            ...prev,
            header: { ...prev.header, icons: {...prev.header.icons, [icon]: !prev.header.icons[icon]} },
        }));
    };

    const handleNavLinkChange = (index, newValue) => {
        const newNavLinks = [...websiteData.header.navLinks];
        newNavLinks[index] = newValue;
        handleUpdate('navLinks', newNavLinks);
    };

    const addNavLink = () => {
        handleUpdate('navLinks', [...websiteData.header.navLinks, 'New Link']);
    };
    
    const removeNavLink = (index) => {
        const newNavLinks = websiteData.header.navLinks.filter((_, i) => i !== index);
        handleUpdate('navLinks', newNavLinks);
    };

    return (
        <div className="p-4 border-b">
            <h3 className="text-lg font-semibold mb-2">Header</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Site Title</label>
                    <EditableText value={websiteData.header.siteTitle} onSave={(val) => handleUpdate('siteTitle', val)} element="h1" className="text-xl font-bold" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Navigation Links</label>
                    {websiteData.header.navLinks.map((link, index) => (
                         <div key={index} className="flex items-center gap-2 mb-1">
                            <EditableText value={link} onSave={(val) => handleNavLinkChange(index, val)} className="flex-grow" />
                            <button onClick={() => removeNavLink(index)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                        </div>
                    ))}
                    <button onClick={addNavLink} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-1"><PlusCircle size={16}/> Add Link</button>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Icons</label>
                    <div className="flex items-center gap-4">
                       {['cart', 'profile', 'search'].map(icon => (
                           <label key={icon} className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" checked={websiteData.header.icons[icon]} onChange={() => handleIconToggle(icon)} className="rounded"/>
                               {icon.charAt(0).toUpperCase() + icon.slice(1)}
                           </label>
                       ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BodyEditor = () => {
    const { websiteData, setWebsiteData } = useContext(WebsiteContext);

    const updateSection = (index, newContent) => {
        const newBody = [...websiteData.body];
        newBody[index] = { ...newBody[index], ...newContent };
        setWebsiteData(prev => ({ ...prev, body: newBody }));
    };

    const removeSection = (index) => {
        const newBody = websiteData.body.filter((_, i) => i !== index);
        setWebsiteData(prev => ({ ...prev, body: newBody }));
    };

    const addSection = (type) => {
        let newSection;
        const newId = `section-${Date.now()}`;
        switch (type) {
            case 'text':
                newSection = { id: newId, type: 'text', title: 'New Text Section', content: 'Click to edit this content.' };
                break;
            case 'gallery':
                newSection = { id: newId, type: 'gallery', title: 'New Gallery', images: ['https://placehold.co/600x400/cccccc/333333?text=New+Image'] };
                break;
            case 'hero':
                newSection = { id: newId, type: 'hero', title: 'New Hero Title', subtitle: 'New hero subtitle.', imageUrl: 'https://placehold.co/1200x600/cccccc/333333?text=New+Hero' };
                break;
            default:
                return;
        }
        setWebsiteData(prev => ({ ...prev, body: [...prev.body, newSection] }));
    };

    const moveSection = (fromIndex, toIndex) => {
        const newBody = [...websiteData.body];
        const [movedItem] = newBody.splice(fromIndex, 1);
        newBody.splice(toIndex, 0, movedItem);
        setWebsiteData(prev => ({ ...prev, body: newBody }));
    };

    const renderSectionControls = (section, index) => {
        return (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white bg-opacity-70 p-1 rounded-md shadow">
                <button onClick={() => moveSection(index, index - 1)} disabled={index === 0} className="p-1 disabled:opacity-50"><ArrowUp size={16}/></button>
                <button onClick={() => moveSection(index, index + 1)} disabled={index === websiteData.body.length - 1} className="p-1 disabled:opacity-50"><ArrowDown size={16}/></button>
                <button onClick={() => removeSection(index)} className="p-1 text-red-500"><Trash2 size={16}/></button>
            </div>
        );
    };

    const renderSection = (section, index) => {
        switch (section.type) {
            case 'hero':
                return (
                    <div className="text-center p-8 bg-gray-100 rounded-lg">
                        <EditableImage src={section.imageUrl} onSave={(val) => updateSection(index, { imageUrl: val })} className="mb-4" />
                        <EditableText value={section.title} onSave={(val) => updateSection(index, { title: val })} element="h2" className="text-4xl font-bold"/>
                        <EditableText value={section.subtitle} onSave={(val) => updateSection(index, { subtitle: val })} element="p" className="text-xl text-gray-600 mt-2"/>
                    </div>
                );
            case 'text':
                return (
                    <div className="p-8">
                        <EditableText value={section.title} onSave={(val) => updateSection(index, { title: val })} element="h3" className="text-2xl font-semibold mb-2"/>
                        <EditableText value={section.content} onSave={(val) => updateSection(index, { content: val })} element="p" className="text-gray-700"/>
                    </div>
                );
            case 'gallery':
                return (
                    <div className="p-8">
                        <EditableText value={section.title} onSave={(val) => updateSection(index, { title: val })} element="h3" className="text-2xl font-semibold mb-4"/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {section.images.map((img, imgIndex) => (
                                <EditableImage key={imgIndex} src={img} onSave={(val) => {
                                    const newImages = [...section.images];
                                    newImages[imgIndex] = val;
                                    updateSection(index, { images: newImages });
                                }} />
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 border-b">
            <h3 className="text-lg font-semibold mb-2">Body Sections</h3>
            <DndProvider backend={HTML5Backend}>
                <div className="space-y-4">
                    {websiteData.body.map((section, index) => (
                        <DraggableSection key={section.id} id={section.id} index={index} moveSection={moveSection}>
                            <div className="border rounded-lg relative group">
                                {renderSection(section, index)}
                                <div className="hidden group-hover:flex">
                                    {renderSectionControls(section, index)}
                                </div>
                            </div>
                        </DraggableSection>
                    ))}
                </div>
            </DndProvider>
            <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-2">Add New Section</h4>
                <div className="flex gap-2">
                    <button onClick={() => addSection('hero')} className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"><Layout size={16}/> Hero</button>
                    <button onClick={() => addSection('text')} className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"><Type size={16}/> Text</button>
                    <button onClick={() => addSection('gallery')} className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"><ImageIcon size={16}/> Gallery</button>
                </div>
            </div>
        </div>
    );
};

const FooterEditor = () => {
    const { websiteData, setWebsiteData } = useContext(WebsiteContext);

    const handleUpdate = (key, value) => {
        setWebsiteData(prev => ({
            ...prev,
            footer: { ...prev.footer, [key]: value },
        }));
    };
    
    const handleSocialLinkChange = (platform, value) => {
        setWebsiteData(prev => ({
            ...prev,
            footer: {
                ...prev.footer,
                socialLinks: { ...prev.footer.socialLinks, [platform]: value }
            }
        }));
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Footer</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Footer Text</label>
                    <EditableText value={websiteData.footer.text} onSave={(val) => handleUpdate('text', val)} className="text-sm text-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Social Media Links</label>
                    <div className="space-y-2">
                        {Object.entries(websiteData.footer.socialLinks).map(([platform, link]) => (
                            <div key={platform} className="flex items-center gap-2">
                                <span className="w-20 capitalize">{platform}:</span>
                                <EditableText value={link} onSave={(val) => handleSocialLinkChange(platform, val)} className="flex-grow text-sm" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PREVIEW COMPONENT ---
const WebsitePreview = ({ data, onBack }) => {
    const { header, body, footer } = data;

    const generateHTML = () => {
        const bodyHtml = body.map(section => {
            switch (section.type) {
                case 'hero':
                    return `<div class="text-center py-20 px-4 bg-gray-100">
                                <img src="${section.imageUrl}" alt="Hero Image" class="w-full max-w-4xl mx-auto h-auto object-cover rounded-lg mb-8 shadow-lg">
                                <h1 class="text-5xl font-bold text-gray-800">${section.title}</h1>
                                <p class="text-xl text-gray-600 mt-4">${section.subtitle}</p>
                            </div>`;
                case 'text':
                    return `<div class="py-16 px-4 max-w-4xl mx-auto">
                                <h2 class="text-3xl font-bold text-gray-800 mb-4">${section.title}</h2>
                                <p class="text-gray-700 leading-relaxed">${section.content}</p>
                            </div>`;
                case 'gallery':
                    const imagesHtml = section.images.map(img => `<img src="${img}" alt="Gallery image" class="w-full h-auto object-cover rounded-lg shadow-md">`).join('');
                    return `<div class="py-16 px-4 max-w-6xl mx-auto">
                                <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">${section.title}</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">${imagesHtml}</div>
                            </div>`;
                default:
                    return '';
            }
        }).join('');

        const navLinksHtml = header.navLinks.map(link => `<a href="#" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">${link}</a>`).join('');
        
        const iconsHtml = `
            ${header.icons.search ? '<button class="p-2 rounded-full hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>' : ''}
            ${header.icons.cart ? '<button class="p-2 rounded-full hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></button>' : ''}
            ${header.icons.profile ? '<button class="p-2 rounded-full hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>' : ''}
        `;

        const socialLinksHtml = Object.entries(footer.socialLinks).map(([platform, link]) => link ? `<a href="${link}" class="text-gray-500 hover:text-gray-900">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>` : '').join(' ');

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-g">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${header.siteTitle}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style> body { font-family: 'Inter', sans-serif; } </style>
            </head>
            <body class="bg-white">
                <header class="shadow-md">
                    <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
                        <a href="#" class="text-2xl font-bold text-gray-800">${header.siteTitle}</a>
                        <div class="hidden md:flex items-center space-x-1">${navLinksHtml}</div>
                        <div class="flex items-center space-x-2">${iconsHtml}</div>
                         <div class="md:hidden flex items-center">
                            <button class="outline-none mobile-menu-button">
                                <svg class="w-6 h-6 text-gray-500" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            </button>
                        </div>
                    </nav>
                </header>
                <main>${bodyHtml}</main>
                <footer class="bg-gray-800 text-white">
                    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                        <p class="text-sm">${footer.text}</p>
                        <div class="flex space-x-4">${socialLinksHtml}</div>
                    </div>
                </footer>
            </body>
            </html>
        `;
    };

    const openPreviewInNewTab = () => {
        const htmlContent = generateHTML();
        const previewWindow = window.open();
        previewWindow.document.write(htmlContent);
        previewWindow.document.close();
    };

    return (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
            <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0">
                <h2 className="text-xl font-bold">Live Preview</h2>
                <div>
                    <button onClick={openPreviewInNewTab} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600">
                        Open in New Tab
                    </button>
                    <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Back to Editor
                    </button>
                </div>
            </div>
            <iframe
                srcDoc={generateHTML()}
                title="Website Preview"
                className="w-full h-[calc(100vh-64px)] border-0"
            />
        </div>
    );
};


// --- MAIN EDITOR VIEW ---
const Editor = ({ template, onBack }) => {
    const { websiteData } = useContext(WebsiteContext);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {isPreviewing && <WebsitePreview data={websiteData} onBack={() => setIsPreviewing(false)} />}
            
            {/* Left Sidebar: Editor Controls */}
            <div className="w-1/3 h-full overflow-y-auto bg-white shadow-lg">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Editor</h2>
                    <div>
                        <button onClick={onBack} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">
                            Change Template
                        </button>
                    </div>
                </div>
                <HeaderEditor />
                <BodyEditor />
                <FooterEditor />
            </div>

            {/* Right Side: Live Preview (Simplified) */}
            <div className="w-2/3 h-full overflow-y-auto p-8">
                <div className="bg-white rounded-lg shadow-2xl mx-auto max-w-full">
                    {/* Simplified Header Preview */}
                    <header className="border-b p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{websiteData.header.siteTitle}</h1>
                        <nav className="flex items-center gap-4">
                            {websiteData.header.navLinks.map((link, i) => <span key={i} className="text-gray-600">{link}</span>)}
                            {websiteData.header.icons.search && <Search size={20} />}
                            {websiteData.header.icons.cart && <ShoppingCart size={20} />}
                            {websiteData.header.icons.profile && <User size={20} />}
                        </nav>
                    </header>

                    {/* Simplified Body Preview */}
                    <main>
                        {websiteData.body.map(section => (
                            <div key={section.id} className="p-8 border-b">
                                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                                {section.type === 'text' && <p className="text-gray-700">{section.content}</p>}
                                {section.type === 'hero' && <p className="text-gray-700">{section.subtitle}</p>}
                                {section.type === 'gallery' && <div className="text-sm text-gray-500">Gallery with {section.images.length} images</div>}
                            </div>
                        ))}
                    </main>

                    {/* Simplified Footer Preview */}
                    <footer className="bg-gray-50 p-4 text-center">
                        <p className="text-sm text-gray-600">{websiteData.footer.text}</p>
                    </footer>
                </div>
            </div>
            
            {/* Floating Action Buttons */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-4">
                 <button onClick={() => setIsChatbotOpen(true)} className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <button onClick={() => setIsPreviewing(true)} className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
            </div>

            <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
        </div>
    );
};

// --- TEMPLATE SELECTION SCREEN ---
const TemplateSelector = ({ onSelectTemplate }) => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'E-commerce', 'Business', 'Blog', 'Portfolio'];

    const filteredTemplates = filter === 'All'
        ? templates
        : templates.filter(t => t.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center">Choose Your Template</h1>
                <p className="mt-2 text-lg text-gray-600 text-center">Select a starting point for your new website.</p>

                <div className="my-8 flex justify-center gap-2 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                filter === category
                                    ? 'bg-indigo-600 text-white shadow'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTemplates.map(template => (
                        <div
                            key={template.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 group"
                            onClick={() => onSelectTemplate(template)}
                        >
                            <div className="relative">
                                <img src={template.thumbnail} alt={template.name} className="w-full h-48 object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100">Select Template</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                                <p className="text-sm text-gray-500">{template.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- APP ---
export default function App() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
    };

    const handleBackToTemplates = () => {
        setSelectedTemplate(null);
    };

    if (selectedTemplate) {
        return (
            <WebsiteProvider template={selectedTemplate}>
                <Editor template={selectedTemplate} onBack={handleBackToTemplates} />
            </WebsiteProvider>
        );
    }

    return <TemplateSelector onSelectTemplate={handleSelectTemplate} />;
}
