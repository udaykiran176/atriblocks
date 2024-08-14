import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { RichText} from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {


    const blockProps = useBlockProps();

    const getYoutubeId = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/embed\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    };
    
    // Extract YouTube video ID from the stored URL
    const youtubeId = getYoutubeId(attributes.youtubeUrl);

    const [materials, setMaterials] = useState(attributes.materials);
    const [tools, setTools] = useState(attributes.tools);
    const [software, setSoftware] = useState(attributes.software);

    const addMaterial = () => {
        const newMaterials = [...materials, { name: '', quantity: '', image: '', buy_link: '' }];
        setMaterials(newMaterials);
        setAttributes({ materials: newMaterials });
    };

    const removeMaterial = (index) => {
        const newMaterials = [...materials];
        newMaterials.splice(index, 1);
        setMaterials(newMaterials);
        setAttributes({ materials: newMaterials });
    };

    const addTool = () => {
        const newTools = [...tools, { name: '', image: '', buy_link: '' }];
        setTools(newTools);
        setAttributes({ tools: newTools });
    };

    const removeTool = (index) => {
        const newTools = [...tools];
        newTools.splice(index, 1);
        setTools(newTools);
        setAttributes({ tools: newTools });
    };

    const addSoftware = () => {
        const newSoftware = [...software, { name: '', image: '', link: '' }];
        setSoftware(newSoftware);
        setAttributes({ software: newSoftware });
    };

    const removeSoftware = (index) => {
        const newSoftware = [...software];
        newSoftware.splice(index, 1);
        setSoftware(newSoftware);
        setAttributes({ software: newSoftware });
    };

    const onSelectImage = (media, index, type) => {
        const newItems = [...(type === 'materials' ? materials : type === 'tools' ? tools : software)];
        newItems[index].image = media.url;
        if (type === 'materials') {
            setMaterials(newItems);
            setAttributes({ materials: newItems });
        } else if (type === 'tools') {
            setTools(newItems);
            setAttributes({ tools: newItems });
        } else {
            setSoftware(newItems);
            setAttributes({ software: newItems });
        }
    };

    const onRemoveImage = (index, type) => {
        const newItems = [...(type === 'materials' ? materials : type === 'tools' ? tools : software)];
        newItems[index].image = '';
        if (type === 'materials') {
            setMaterials(newItems);
            setAttributes({ materials: newItems });
        } else if (type === 'tools') {
            setTools(newItems);
            setAttributes({ tools: newItems });
        } else {
            setSoftware(newItems);
            setAttributes({ software: newItems });
        }
    };

    const onAddCircuitDiagram = () => {
        const newCircuitDiagrams = [...attributes.circuit_diagrams, { url: '', subtitle: '' }];
        setAttributes({ circuit_diagrams: newCircuitDiagrams });
    };

    const onRemoveCircuitDiagram = (indexToRemove) => {
        const newCircuitDiagrams = attributes.circuit_diagrams.filter((_, index) => index !== indexToRemove);
        setAttributes({ circuit_diagrams: newCircuitDiagrams });
    };
    
    
    const onUpdateCircuitDiagram = (index, newValue) => {
        const newCircuitDiagrams = [...attributes.circuit_diagrams];
        newCircuitDiagrams[index] = { ...newCircuitDiagrams[index], ...newValue };
        setAttributes({ circuit_diagrams: newCircuitDiagrams });
    };

    const onAddProjectCode = () => {
        const newProjectCodes = [...attributes.project_codes, { code: '', subtitle: '' }];
        setAttributes({ project_codes: newProjectCodes });
    };

    const onRemoveProjectCode = (indexToRemove) => {
        const newProjectCodes = attributes.project_codes.filter((_, index) => index !== indexToRemove);
        setAttributes({ project_codes: newProjectCodes });
    };
    
    
    const onUpdateProjectCode = (index, newValue) => {
        const newProjectCodes = [...attributes.project_codes];
        newProjectCodes[index] = { ...newProjectCodes[index], ...newValue };
        setAttributes({ project_codes: newProjectCodes });
    };

    return (
        <div {...blockProps}>
            <div class="detailsbox">
                <h2>Introduction</h2>
            
                    <RichText
                        tagName="p"
                        value={attributes.project_intro}
                        onChange={(value) => setAttributes({ project_intro: value })}
                        placeholder="Enter Project Introduction"
                    />
            </div>



            <div class="detailsbox">
          <h2>YouTube Video URL</h2>
            <TextControl
                label="Enter YouTube Video URL"
                value={attributes.youtubeUrl}
                onChange={(value) => setAttributes({ youtubeUrl: value })}
            />
            {youtubeId && (
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ marginTop: '10px' }}
                ></iframe>
            )}
            </div>

            <div class="detailsbox">
                <h2>Materials Required</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Buy Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material, index) => (
                            <tr key={index}>
                                <td>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(media, index, 'materials')}
                                        allowedTypes={['image']}
                                        value={material.image}
                                        render={({ open }) => (
                                            <Button isPrimary onClick={open}>
                                                {material.image ? 'Change' : 'Select'} Image
                                            </Button>
                                        )}
                                    />
                                    {material.image && (
                                        <>
                                            <img
                                                src={material.image}
                                                style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                            />
                                            <Button onClick={() => onRemoveImage(index, 'materials')} isLink isDestructive>
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <TextControl
                                        value={material.name}
                                        onChange={(value) => {
                                            const newMaterials = [...materials];
                                            newMaterials[index].name = value;
                                            setMaterials(newMaterials);
                                            setAttributes({ materials: newMaterials });
                                        }}
                                    />
                                </td>
                                <td>
                                    <TextControl
                                        type="number"
                                        value={material.quantity}
                                        onChange={(value) => {
                                            const newMaterials = [...materials];
                                            newMaterials[index].quantity = value;
                                            setMaterials(newMaterials);
                                            setAttributes({ materials: newMaterials });
                                        }}
                                    />
                                </td>
                                <td>
                                    <TextControl
                                        value={material.buy_link}
                                        onChange={(value) => {
                                            const newMaterials = [...materials];
                                            newMaterials[index].buy_link = value;
                                            setMaterials(newMaterials);
                                            setAttributes({ materials: newMaterials });
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button isDestructive onClick={() => removeMaterial(index)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button isPrimary onClick={addMaterial}>
                    Add Material
                </Button>
            </div>

            <div class="detailsbox">
                <h2>Tools Required</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Buy Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool, index) => (
                            <tr key={index}>
                                <td>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(media, index, 'tools')}
                                        allowedTypes={['image']}
                                        value={tool.image}
                                        render={({ open }) => (
                                            <Button isPrimary onClick={open}>
                                                {tool.image ? 'Change' : 'Select'} Image
                                            </Button>
                                        )}
                                    />
                                    {tool.image && (
                                        <>
                                            <img
                                                src={tool.image}
                                                style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                            />
                                            <Button onClick={() => onRemoveImage(index, 'tools')} isLink isDestructive>
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <TextControl
                                        value={tool.name}
                                        onChange={(value) => {
                                            const newTools = [...tools];
                                            newTools[index].name = value;
                                            setTools(newTools);
                                            setAttributes({ tools: newTools });
                                        }}
                                    />
                                </td>
                                <td>
                                    <TextControl
                                        value={tool.buy_link}
                                        onChange={(value) => {
                                            const newTools = [...tools];
                                            newTools[index].buy_link = value;
                                            setTools(newTools);
                                            setAttributes({ tools: newTools });
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button isDestructive onClick={() => removeTool(index)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button isPrimary onClick={addTool}>
                    Add Tool
                </Button>
            </div>

            <div class="detailsbox">
                <h2>Software Required</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {software.map((soft, index) => (
                            <tr key={index}>
                                <td>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(media, index, 'software')}
                                        allowedTypes={['image']}
                                        value={soft.image}
                                        render={({ open }) => (
                                            <Button isPrimary onClick={open}>
                                                {soft.image ? 'Change' : 'Select'} Image
                                            </Button>
                                        )}
                                    />
                                    {soft.image && (
                                        <>
                                            <img
                                                src={soft.image}
                                                style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                            />
                                            <Button onClick={() => onRemoveImage(index, 'software')} isLink isDestructive>
                                                Remove
                                            </Button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <TextControl
                                        value={soft.name}
                                        onChange={(value) => {
                                            const newSoftware = [...software];
                                            newSoftware[index].name = value;
                                            setSoftware(newSoftware);
                                            setAttributes({ software: newSoftware });
                                        }}
                                    />
                                </td>
                                <td>
                                    <TextControl
                                        value={soft.link}
                                        onChange={(value) => {
                                            const newSoftware = [...software];
                                            newSoftware[index].link = value;
                                            setSoftware(newSoftware);
                                            setAttributes({ software: newSoftware });
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button isDestructive onClick={() => removeSoftware(index)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button isPrimary onClick={addSoftware}>
                    Add Software
                </Button>
            </div>

            <div class="detailsbox">
    {attributes.circuit_diagrams.map((circuitDiagram, index) => (
        <div key={index}>
            <h3>Circuit Diagram {index + 1}</h3>
            <TextControl
                label="Subtitle"
                value={circuitDiagram.subtitle}
                onChange={(subtitle) => onUpdateCircuitDiagram(index, { subtitle })}
            />
            <MediaUpload
                onSelect={(media) => onUpdateCircuitDiagram(index, { url: media.url })}
                allowedTypes={['image']}
                value={circuitDiagram.url}
                render={({ open }) => (
                    <Button isPrimary onClick={open}>
                        {circuitDiagram.url ? 'Change' : 'Select'} Circuit Diagram
                    </Button>
                )}
            />
            {circuitDiagram.url && (
                <img
                    src={circuitDiagram.url}
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', marginTop: '10px' }}
                />
            )}
            <Button isDestructive onClick={() => onRemoveCircuitDiagram(index)} style={{ marginTop: '10px' }}>
                Remove Circuit Diagram
            </Button>
        </div>
    ))}
    <Button isSecondary onClick={onAddCircuitDiagram} style={{ marginTop: '20px' }}>
        Add Circuit Diagram
    </Button>
            </div>


            <div class="detailsbox">
                {attributes.project_codes.map((projectCode, index) => (
                    <div key={index}>
                        <h3>Project Code {index + 1}</h3>
                        <TextControl
                            label="Subtitle"
                            value={projectCode.subtitle}
                            onChange={(subtitle) => onUpdateProjectCode(index, { subtitle })}
                        />
                        <textarea
                            style={{ height: '200px', width: '100%' }}
                            value={projectCode.code}
                            onChange={(e) => onUpdateProjectCode(index, { code: e.target.value })}
                        />
                        <Button isDestructive onClick={() => onRemoveProjectCode(index)} style={{ marginTop: '10px' }}>
                            Remove Project Code
                        </Button>
                    </div>
                ))}
                <Button isSecondary onClick={onAddProjectCode} style={{ marginTop: '20px' }}>
                    Add Project Code
                </Button>
            </div>

            <div class="detailsbox">
                <h2>Steps to Make</h2>
                {attributes.steps_to_make.map((step, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Step {index + 1}</h3>
                        <RichText
                            tagName="p"
                            value={step}
                            onChange={(value) => {
                                const newSteps = [...attributes.steps_to_make];
                                newSteps[index] = value;
                                setAttributes({ steps_to_make: newSteps });
                            }}
                            placeholder="Enter Step"
                        />
                        <Button isDestructive onClick={() => {
                            const newSteps = [...attributes.steps_to_make];
                            newSteps.splice(index, 1);
                            setAttributes({ steps_to_make: newSteps });
                        }}>
                            Remove Step
                        </Button>
                    </div>
                ))}
                <Button isPrimary onClick={() => setAttributes({ steps_to_make: [...attributes.steps_to_make, ''] })}>
                    Add Step
                </Button>
            </div>
            
            
            <div className="detailsbox">
                <h2>Conclusion</h2>
                <RichText
                    tagName="p"
                    value={attributes.project_conclusion}
                    onChange={(value) => setAttributes({ project_conclusion: value })}
                    placeholder="Enter Project Conclusion"
                />
            </div>

              <div className="detailsbox">
                <h2>FAQ's</h2>
                {attributes.faqs.map((faq, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Question {index + 1}</h3>
                        <RichText
                            tagName="p"
                            value={faq.question}
                            onChange={(value) => {
                                const newFaqs = [...attributes.faqs];
                                newFaqs[index].question = value;
                                setAttributes({ faqs: newFaqs });
                            }}
                            placeholder="Enter Question"
                        />
                        <h3>Answer</h3>
                        <RichText
                            tagName="p"
                            value={faq.answer}
                            onChange={(value) => {
                                const newFaqs = [...attributes.faqs];
                                newFaqs[index].answer = value;
                                setAttributes({ faqs: newFaqs });
                            }}
                            placeholder="Enter Answer"
                        />
                        <Button
                            isDestructive
                            onClick={() => {
                                const newFaqs = [...attributes.faqs];
                                newFaqs.splice(index, 1);
                                setAttributes({ faqs: newFaqs });
                            }}
                        >
                            Remove FAQ
                        </Button>
                    </div>
                ))}
                <Button
                    isPrimary
                    onClick={() =>
                        setAttributes({ faqs: [...attributes.faqs, { question: '', answer: '' }] })
                    }
                >
                    Add FAQ
                </Button>
            </div>       



           
        </div>
    );
}
