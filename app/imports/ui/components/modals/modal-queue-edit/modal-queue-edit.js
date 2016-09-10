import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import moment from 'moment';

import { updateQueue } from '/imports/api/queues/methods.js';
import { activeCourses, locations, endTimes } from
  '/imports/ui/components/modals/modal-queue-create/modal-queue-create.js';

import './modal-queue-edit.html';

Template.ModalQueueEdit.helpers({
  activeCourses,
  locations,
  endTimes,

  isCurrentLocation(queue, location) {
    return location && location._id === queue.locationId;
  },

  isCurrentEndTime(queue, time) {
    return queue.scheduledEndTime && moment(queue.scheduledEndTime).isSame(moment(time.ISOString));
  },
});

Template.ModalQueueEdit.events({
  'submit #js-modal-queue-edit-form'(event) {
    event.preventDefault();

    const data = {
      queueId: this.queue._id,
      name: event.target.name.value,
      locationId: event.target.locationId.value,
      scheduledEndTime: new Date(event.target.endTime.value),
    };

    updateQueue.call(data, (err) => {
      if (err) {
        console.error(err);
      } else {
        $('.modal-queue-edit').modal('hide');
      }
    });
  },
});