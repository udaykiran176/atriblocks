import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save();

    const getYoutubeId = (url) => {
        const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/embed\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    };

    const youtubeId = getYoutubeId(attributes.youtubeUrl);

    return (
        <div {...blockProps}>
            <div class="detailsbox">
                <h2>Introduction</h2>
                <RichText.Content tagName="p" value={attributes.project_intro} />
            </div>

            <div class="detailsbox">
                <h2>YouTube Video URL</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.materials.map((material, index) => (
                            <tr key={index}>
                                <td>
                                    {material.image && (
                                        <img
                                            src={material.image}
                                            style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                        />
                                    )}
                                </td>
                                <td>{material.name}</td>
                                <td>{material.quantity}</td>
                                <td>
                                    {material.buy_link && (
                                        <a href={material.buy_link} target="_blank" rel="noopener noreferrer">
                                            Buy
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="detailsbox">
                <h2>Tools Required</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Buy Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.tools.map((tool, index) => (
                            <tr key={index}>
                                <td>
                                    {tool.image && (
                                        <img
                                            src={tool.image}
                                            style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                        />
                                    )}
                                </td>
                                <td>{tool.name}</td>
                                <td>
                                    {tool.buy_link && (
                                        <a href={tool.buy_link} target="_blank" rel="noopener noreferrer">
                                            Buy
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="detailsbox">
                <h2>Software Required</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.software.map((soft, index) => (
                            <tr key={index}>
                                <td>
                                    {soft.image && (
                                        <img
                                            src={soft.image}
                                            style={{ maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px' }}
                                        />
                                    )}
                                </td>
                                <td>{soft.name}</td>
                                <td>
                                    {soft.link && (
                                        <a href={soft.link} target="_blank" rel="noopener noreferrer">
                                            Link
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class="detailsbox">
                {attributes.circuit_diagrams.map((circuitDiagram, index) => (
                    <div key={index}>
                        <h3>Circuit Diagram {index + 1}</h3>
                        <p>{circuitDiagram.subtitle}</p>
                        {circuitDiagram.url && (
                            <img
                                src={circuitDiagram.url}
                                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginTop: '10px' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div class="detailsbox">
                {attributes.project_codes.map((projectCode, index) => (
                    <div key={index}>
                        <h3>Project Code {index + 1}</h3>
                        <p>{projectCode.subtitle}</p>
                        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                            <code>{projectCode.code}</code>
                        </pre>
                    </div>
                ))}
            </div>

            <div class="detailsbox">
                <h2>Steps to Make</h2>
                {attributes.steps_to_make.map((step, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Step {index + 1}</h3>
                        <RichText.Content tagName="p" value={step} />
                    </div>
                ))}
            </div>

            <div className="detailsbox">
                <h2>Conclusion</h2>
                <RichText.Content
                    tagName="p"
                    value={attributes.project_conclusion}
                />
            </div>

            <div className="detailsbox">
                <h2>FAQ's</h2>
                {attributes.faqs.map((faq, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Question {index + 1}</h3>
                        <RichText.Content tagName="p" value={faq.question} />
                        <h3>Answer</h3>
                        <RichText.Content tagName="p" value={faq.answer} />
                    </div>
                ))}
            </div>



        </div>
    );
}
