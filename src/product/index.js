/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';


/**
 * Internal dependencies
 */


import metadata from './block.json';
const calendarIcon = (
<svg width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.01"/>
<path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
<path d="M4 14L24 24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24 44V24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M44 14L24 24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M34 9L14 19" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
    attributes: {
        introduction: { type: 'string', default: '' },
        specifications: { type: 'array', default: [] },
        advantage: { type: 'array', default: [] },
        application: { type: 'array', default: [] },
        packages: { type: 'array', default: [] },
    },

    icon: calendarIcon,
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const [specifications, setSpecifications] = useState(attributes.specifications);
        const [advantage, setAdvantage] = useState(attributes.advantage);
        const [application, setApplication] = useState(attributes.application);
        const [packages, setPackages] = useState(attributes.packages);


        useEffect(() => {
            setSpecifications(attributes.specifications);
            setAdvantage(attributes.advantage);
            setApplication(attributes.application);
            setPackages(attributes.packages);
        }, [attributes]);


        const addSpecification = () => {
            const newSpecifications = [...specifications, { headline: '', detail: '' }];
            setSpecifications(newSpecifications);
            setAttributes({ specifications: newSpecifications });
        };


        const removeSpecification = (index) => {
            const newSpecifications = [...specifications];
            newSpecifications.splice(index, 1);
            setSpecifications(newSpecifications);
            setAttributes({ specifications: newSpecifications });
        };


        const addAdvantage = () => {
            const newAdvantage = [...advantage, { item: '' }];
            setAdvantage(newAdvantage);
            setAttributes({ advantage: newAdvantage });
        };


        const removeAdvantage = (index) => {
            const newAdvantage = [...advantage];
            newAdvantage.splice(index, 1);
            setAdvantage(newAdvantage);
            setAttributes({ advantage: newAdvantage });
        };


        const addApplication = () => {
            const newApplication = [...application, { item: '' }];
            setApplication(newApplication);
            setAttributes({ application: newApplication });
        };


        const removeApplication = (index) => {
            const newApplication = [...application];
            newApplication.splice(index, 1);
            setApplication(newApplication);
            setAttributes({ application: newApplication });
        };


        const addPackage = () => {
            const newPackages = [...packages, { name: '' }];
            setPackages(newPackages);
            setAttributes({ packages: newPackages });
        };


        const removePackage = (index) => {
            const newPackages = [...packages];
            newPackages.splice(index, 1);
            setPackages(newPackages);
            setAttributes({ packages: newPackages });
        };


        const addRelatedArticle = () => {
            const newRelatedArticles = [...relatedArticles, { title: '', link: '', imageUrl: '' }];
            setRelatedArticles(newRelatedArticles);
            setAttributes({ relatedArticles: newRelatedArticles });
        };


        const removeRelatedArticle = (index) => {
            const newRelatedArticles = [...relatedArticles];
            newRelatedArticles.splice(index, 1);
            setRelatedArticles(newRelatedArticles);
            setAttributes({ relatedArticles: newRelatedArticles });
        };


        const addRelatedProduct = () => {
            const newRelatedProducts = [...relatedProducts, { name: '', link: '', imageUrl: '' }];
            setRelatedProducts(newRelatedProducts);
            setAttributes({ relatedProducts: newRelatedProducts });
        };


        const removeRelatedProduct = (index) => {
            const newRelatedProducts = [...relatedProducts];
            newRelatedProducts.splice(index, 1);
            setRelatedProducts(newRelatedProducts);
            setAttributes({ relatedProducts: newRelatedProducts });
        };


        const fetchImageAndTitle = async (url, type, index) => {
            try {
                const response = await fetch(`${url}?_embed`);
                const data = await response.json();
                if (type === 'article') {
                    const newRelatedArticles = [...relatedArticles];
                    newRelatedArticles[index].title = data.title.rendered;
                    newRelatedArticles[index].imageUrl = data._embedded['wp:featuredmedia'][0].source_url;
                    setRelatedArticles(newRelatedArticles);
                    setAttributes({ relatedArticles: newRelatedArticles });
                } else {
                    const newRelatedProducts = [...relatedProducts];
                    newRelatedProducts[index].name = data.title.rendered;
                    newRelatedProducts[index].imageUrl = data._embedded['wp:featuredmedia'][0].source_url;
                    setRelatedProducts(newRelatedProducts);
                    setAttributes({ relatedProducts: newRelatedProducts });
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };


        const handleArticleLinkChange = (value, index) => {
            const newRelatedArticles = [...relatedArticles];
            newRelatedArticles[index].link = value;
            setRelatedArticles(newRelatedArticles);
            setAttributes({ relatedArticles: newRelatedArticles });
            fetchImageAndTitle(value, 'article', index);
        };


        const handleProductLinkChange = (value, index) => {
            const newRelatedProducts = [...relatedProducts];
            newRelatedProducts[index].link = value;
            setRelatedProducts(newRelatedProducts);
            setAttributes({ relatedProducts: newRelatedProducts });
            fetchImageAndTitle(value, 'product', index);
        };


        return (
            <div {...blockProps}>
                <div>
                    <h2>Introduction</h2>
                    <TextareaControl
                        label="Enter Product Introduction"
                        value={attributes.introduction}
                        onChange={(value) => setAttributes({ introduction: value })}
                    />
                </div>


                <div>
                    <h2>Specifications</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Specification</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specifications.map((spec, index) => (
                                <tr key={index}>
                                    <td>
                                        <TextControl
                                            value={spec.headline}
                                            onChange={(value) => {
                                                const newSpecifications = [...specifications];
                                                newSpecifications[index].headline = value;
                                                setSpecifications(newSpecifications);
                                                setAttributes({ specifications: newSpecifications });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextControl
                                            value={spec.detail}
                                            onChange={(value) => {
                                                const newSpecifications = [...specifications];
                                                newSpecifications[index].detail = value;
                                                setSpecifications(newSpecifications);
                                                setAttributes({ specifications: newSpecifications });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Button isDestructive onClick={() => removeSpecification(index)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button isPrimary onClick={addSpecification}>
                        Add Specification
                    </Button>
                </div>


                <div>
                    <h2>Advantage</h2>
                    {advantage.map((adv, index) => (
                        <div key={index}>
                            <TextControl
                                value={adv.item}
                                onChange={(value) => {
                                    const newAdvantage = [...advantage];
                                    newAdvantage[index].item = value;
                                    setAdvantage(newAdvantage);
                                    setAttributes({ advantage: newAdvantage });
                                }}
                            />
                            <Button isDestructive onClick={() => removeAdvantage(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addAdvantage}>Add Advantage</Button>
                </div>


                <div>
                    <h2>Application</h2>
                    {application.map((app, index) => (
                        <div key={index}>
                            <TextControl
                                value={app.item}
                                onChange={(value) => {
                                    const newApplication = [...application];
                                    newApplication[index].item = value;
                                    setApplication(newApplication);
                                    setAttributes({ application: newApplication });
                                }}
                            />
                            <Button isDestructive onClick={() => removeApplication(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addApplication}>Add Application</Button>
                </div>


                <div>
                    <h2>what comes with package?</h2>
                    {packages.map((pack, index) => (
                        <div key={index}>
                            <TextControl
                                value={pack.name}
                                onChange={(value) => {
                                    const newPackages = [...packages];
                                    newPackages[index].name = value;
                                    setPackages(newPackages);
                                    setAttributes({ packages: newPackages });
                                }}
                            />
                            <Button isDestructive onClick={() => removePackage(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addPackage}>Add Package</Button>
                </div>


            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();


        const renderList = (items) => (
            <ul>
                {items.map((item, index) => (
                    <li key={index}>✅ {item.item || item.name}</li>
                ))}
            </ul>
        );


        const renderTable = (items, headers) => (
            <div>
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.headline || item.name || item.title}</td>
                                <td>{item.detail || item.link}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );


        return (
            <div {...blockProps}>
                {attributes.introduction && (
                    <div className="produtbox">
                        <h2>Product Introduction</h2>
                        <div>{attributes.introduction}</div>
                    </div>
                )}


                {attributes.specifications.length > 0 && (
                    <div className="produtbox">
                        <h2>Product Specifications</h2>
                        {renderTable(attributes.specifications, ['Parameter', 'Detail'])}
                    </div>
                )}


                {attributes.advantage.length > 0 && (
                    <div className="produtbox">
                        <h2>Product Highlights</h2>
                        {renderList(attributes.advantage)}
                    </div>
                )}


                {attributes.application.length > 0 && (
                    <div className="produtbox">
                        <h2>Product Applications</h2>
                        {renderList(attributes.application)}
                    </div>
                )}


                {attributes.packages.length > 0 && (
                    <div className="produtbox">
                        <h2>Package contents?</h2>
                        {renderList(attributes.packages)}
                    </div>
                )}
            </div>
        );
    },
});
