import React from 'react';
import Zoom from 'react-reveal/Zoom';
import KevinDurantJersey from '../../../Resources/images/durant_jersey.jpg';
import StephenCurryJersey from '../../../Resources/images/curry_jersey.jpg';
import KlayThompsonJersey from '../../../Resources/images/thompson_jersey.jpg';
import DraymondGreenJersey from '../../../Resources/images/green_jersey.jpg';

const Animation = () => {
    return (
        <div>
            <div className="text_top">
                <Zoom>
                    <span>Win a Jersey</span>
                </Zoom>
            </div>
            <div className="promotion_animation">
                <div className="jersey">
                    <Zoom>
                        <div style={{background:`url(${KevinDurantJersey}) no-repeat`}}></div>
                    </Zoom>
                </div>
                <div className="jersey">
                    <Zoom>
                        <div style={{background:`url(${StephenCurryJersey}) no-repeat`}}></div>
                    </Zoom>
                </div>
                <div className="jersey">
                    <Zoom>
                        <div style={{background:`url(${KlayThompsonJersey}) no-repeat`}}></div>
                    </Zoom>
                </div>
                <div className="jersey">
                    <Zoom>
                        <div style={{background:`url(${DraymondGreenJersey}) no-repeat`}}></div>
                    </Zoom>
                </div>
            </div>
        </div>
    );
};

export default Animation;