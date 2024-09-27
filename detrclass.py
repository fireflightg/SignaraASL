import torch
import numpy as np
import cv2
import time
from ultralytics.vit import RTDETR

# Load pre-trained model
import supervision as sv


class DETRClass: 
    def __init__(self,caputre_index):
        self.capture_index = caputre_index

        self.device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

        print(self.device)
        self.model = RTDETR("rtdetr-l.pt")

        self.CLASS_NAMES_DICT = self.model.model.names
        print("Available classes: ", self.CLASS_NAMES_DICT)

        self.box_annotator = sv.BoxAnnotator(sv.ColorPalette.DEFAULT, thickness=3)

    def plot_bboxs(self, results, frame):



            boxes = results[0].boxes.cpu().numpy()
            class_id = boxes.cls
            conf = boxes.conf
            xyxy = boxes.xyxy


            #Plot the bounding boxes and labels
            class_id = class_id.astype(np.int32)

            detections = [(xyxy[i], conf[i], class_id[i]) for i in range(len(class_id))]
            print(detections)
            for det in detections:
                #print(det)  # Print each detection tuple
                #print(len(det))  # Print the length of each tuple

        # Now try to unpack based on observed structure
                try:
                    xyxy, mask, confidence, class_id, track_id = det
                    print(xyxy, mask, confidence, class_id, track_id)
                except ValueError as e:
                    print(f"Error unpacking detection: {e}")
                    continue

            # Adjusting list comprehension to the correct tuple structure
            self.labels = ["hello" for det in detections]#f"{self.CLASS_NAMES_DICT[class_id]} {confidence:.2f}"
            for det, label in zip(detections, self.labels):
        # Assuming det is a tuple (xyxy, conf, class_id)
                bbox = det[0].astype(int)  # Ensure the bounding box coordinates are integer
                frame = self.box_annotator.annotate(frame, bbox, label)

            return frame

           

        
    def __call__(self):

            cap = cv2.VideoCapture(self.capture_index)
            assert cap.isOpened(), 'Cannot open camera'
            cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
            cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
            while cap.isOpened():

                start_time = time.perf_counter()
                ret, frame = cap.read()

                results = self.model.predict(frame)

                frame = self.plot_bboxs(results, frame)

                end_time = time.perf_counter()
                fps = 1 / (end_time - start_time)

                cv2.putText(frame, f'FPS: {fps:.2f}', (20, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

                cv2.imshow('DETR', frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                cap.release()
                cv2.destroyAllWindows()


transformer_detector = DETRClass(0)
transformer_detector()