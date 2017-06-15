import DashAdapter from '../../src/dash/DashAdapter';
import StreamProcessor from '../../src/streaming/StreamProcessor';
import RepresentationController from '../../src/dash/controllers/RepresentationController';
import Events from '../../src/core/events/Events';
import MediaPlayerEvents from '../../src/streaming/MediaPlayerEvents';

const expect = require('chai').expect;

const context = {};
const dashAdapter = DashAdapter(context).getInstance();

describe('DashAdapter', function () {
    it("should throw an exception when attempting to call getEventsFor While the reset function was not called", function () {
        expect(dashAdapter.getEventsFor.bind(dashAdapter)).to.throw("reset has not been called!");
    });

    it("should throw an exception when attempting to call updateData While the reset function was not called", function () {
        expect(dashAdapter.updateData.bind(dashAdapter)).to.throw("reset has not been called!");
    });

    it("should throw an exception when attempting to call getMediaInfoForType While the reset function was not called", function () {
        expect(dashAdapter.getMediaInfoForType.bind(dashAdapter)).to.throw("reset has not been called!");
    });

    it("should throw an exception when attempting to call getDataForMedia While the reset function was not called", function () {
        expect(dashAdapter.getDataForMedia.bind(dashAdapter)).to.throw("reset has not been called!");
    });

    it("should return an empty array when getEventsFor is called and voPeriods is an empty array", function () {
        dashAdapter.reset();
        const eventsArray = dashAdapter.getEventsFor();

        expect(eventsArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(eventsArray).to.be.empty;                // jshint ignore:line
    });

    it("should return null when getMediaInfoForType is called and voPeriods is an empty array", function () {
        const mediaInfo = dashAdapter.getMediaInfoForType();

        expect(mediaInfo).to.be.null;                // jshint ignore:line
    });
    
    it("should return null when getDataForMedia is called and voPeriods is an empty array, mediaInfo parameter is undefined", function () {
        const adaptation = dashAdapter.getDataForMedia();

        expect(adaptation).to.be.null;                // jshint ignore:line
    });
    
    describe('streamProcessor parameter is missing or malformed', () => {
        it("should throw an error when getInitRequest is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.getInitRequest.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getNextFragmentRequest is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.getNextFragmentRequest.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getFragmentRequestForTime is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.getFragmentRequestForTime.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when generateFragmentRequestForTime is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.generateFragmentRequestForTime.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getIndexHandlerTime is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.getIndexHandlerTime.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });
        
        it("should throw an error when setIndexHandlerTime is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.setIndexHandlerTime.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when updateData is called and streamProcessor parameter is undefined", function () {
            expect(dashAdapter.updateData.bind(dashAdapter)).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getInitRequest is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.getInitRequest.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getNextFragmentRequest is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.getNextFragmentRequest.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getFragmentRequestForTime is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.getFragmentRequestForTime.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when generateFragmentRequestForTime is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.generateFragmentRequestForTime.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when getIndexHandlerTime is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.getIndexHandlerTime.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });
        
        it("should throw an error when setIndexHandlerTime is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.setIndexHandlerTime.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });

        it("should throw an error when updateData is called and streamProcessor is an empty object", function () {
            expect(dashAdapter.updateData.bind(dashAdapter, {})).to.be.throw('streamProcessor parameter is missing or malformed!');
        });
    });
    
    describe('streamProcessor parameter is properly defined, without its attributes', () => {
        const streamProcessor = StreamProcessor(context).create({
                        mimeType: 'video/mp4',
                        timelineConverter: {},
                        adapter: dashAdapter,
                        baseURLController: {}
                    });

        it("should return null when getInitRequest is called and streamProcessor is defined, without its attributes", function () {
            const initRequest = dashAdapter.getInitRequest(streamProcessor, 0);

            expect(initRequest).to.be.null;                // jshint ignore:line
        });

        it("should return null when getNextFragmentRequest is called and streamProcessor is defined, without its attributes", function () {
            const nextFragRequest = dashAdapter.getNextFragmentRequest(streamProcessor);

            expect(nextFragRequest).to.be.null;                // jshint ignore:line
        });

        it("should return null when getFragmentRequestForTime is called and streamProcessor is defined, without its attributes", function () {
            const fragRequest = dashAdapter.getFragmentRequestForTime(streamProcessor);

            expect(fragRequest).to.be.null;                // jshint ignore:line 
        });

        it("should return null when generateFragmentRequestForTime is called and streamProcessor is defined, without its attributes", function () {
            const generatedFragRequest = dashAdapter.generateFragmentRequestForTime(streamProcessor);

            expect(generatedFragRequest).to.be.null;                // jshint ignore:line 
        });

        it("should return NaN when getIndexHandlerTime is called and streamProcessor is defined, without its attributes", function () {
            const time = dashAdapter.getIndexHandlerTime(streamProcessor);

            expect(time).to.be.NaN;                // jshint ignore:line  
        });
        
        it("should not throw an error when setIndexHandlerTime is called and streamProcessor is defined, without its attributes", function () {
            expect(dashAdapter.setIndexHandlerTime.bind(dashAdapter, streamProcessor)).to.not.throw();
        });

        it("should not throw an error when updateData is called and streamProcessor is defined, without its attributes", function () {
            expect(dashAdapter.updateData.bind(dashAdapter, streamProcessor)).to.not.throw();
        });

        it("should throw an error when getInitRequest is called and streamProcessor is defined, but quality is not a number", function () {
            expect(dashAdapter.getInitRequest.bind(dashAdapter, streamProcessor, {})).to.be.throw('quality argument is not an integer');
        });
    });

    describe('representationController parameter is missing or malformed', () => {
        it("should throw an error when getRepresentationInfoForQuality is called and representationController parameter is undefined", function () {
            expect(dashAdapter.getRepresentationInfoForQuality.bind(dashAdapter)).to.be.throw('representationController parameter is missing or malformed!');
        });

        it("should throw an error when getCurrentRepresentationInfo is called and representationController parameter is undefined", function () {
            expect(dashAdapter.getCurrentRepresentationInfo.bind(dashAdapter)).to.be.throw('representationController parameter is missing or malformed!');
        });
    });
    
    describe('representationController parameter is properly defined, without its attributes', () => {
        Events.extend(MediaPlayerEvents);
        const representationController = RepresentationController(context).create();

        it("should throw an error when getRepresentationInfoForQuality is called and representationController parameter is defined, but quality is not a number", function () {
            expect(dashAdapter.getRepresentationInfoForQuality.bind(dashAdapter, representationController, {})).to.be.throw('quality argument is not an integer');
        });
    });
});