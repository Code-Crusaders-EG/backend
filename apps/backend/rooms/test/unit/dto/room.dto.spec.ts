import { RoomDto } from '../../../src/app/rooms/dto';
import {
  emptyRoomDataObjects,
  goodRoomData,
  overLimitRoomObjects,
  underLimitRoomObjects,
} from '../mock/room.mock'; // Import test data objects
import { validateSync } from 'class-validator'; // Import validateSync function

describe('Room DTO Validations', () => {
  it('should create a new instance of RoomDto using valid inputs', () => {
    const room = new RoomDto(goodRoomData);
    expect(room).toBeDefined();
  });

  describe('Empty field validation', () => {
    for (const key in emptyRoomDataObjects) {
      it(`should fail validation with empty ${key}`, () => {
        const room: RoomDto = new RoomDto(emptyRoomDataObjects[key]);
        const errors = validateSync(room);

        // Check if the key is among the fields where empty values are allowed
        if (
          [
            'description',
            'moderators',
            'participants',
            'collaborators',
          ].includes(key)
        )
          expect(errors.length).toEqual(0);
        // No validation error expected for empty fields allowed
        else expect(errors.length).toBeGreaterThan(0); // Validation error expected for other fields
      });
    }
  });

  describe('Over limit', () => {
    for (const key in overLimitRoomObjects) {
      it(`should fail validation with over limit ${key}`, () => {
        const room: RoomDto = new RoomDto(overLimitRoomObjects[key]);
        const errors = validateSync(room);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });

  describe('Under limit', () => {
    for (const key in underLimitRoomObjects) {
      it(`should fail validation with under limit ${key}`, () => {
        const room: RoomDto = new RoomDto(underLimitRoomObjects[key]);
        const errors = validateSync(room);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
});
