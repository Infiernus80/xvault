import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { TusService } from './services/tus/tus.service';

describe('UploadController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        {
          provide: TusService,
          useValue: {
            handleTus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return uppy mvc example html', () => {
    const page = controller.uppyExample();
    expect(page).toContain('Uppy + TUS');
    expect(page).toContain('/upload/uploads');
  });
});
