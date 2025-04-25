@RestController
@RequestMapping("/api/learning")
public class LearningItemController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private LearningItemRepository repository;

    @PostMapping
    public ResponseEntity<?> createLearningItem(
            @RequestParam String description,
            @RequestParam("photos") MultipartFile[] photos) throws IOException {

        if (photos.length > 3) {
            return ResponseEntity.badRequest().body("You can only upload up to 3 photos.");
        }

        List<String> filePaths = new ArrayList<>();
        for (MultipartFile photo : photos) {
            String fileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();
            Path path = Paths.get(uploadDir, fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
            filePaths.add(path.toString());
        }

        LearningItem item = new LearningItem();
        item.setDescription(description);
        item.setPhotoPaths(filePaths);

        return ResponseEntity.ok(repository.save(item));
    }

    @GetMapping
    public List<LearningItem> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(
            @PathVariable Long id,
            @RequestParam String description,
            @RequestParam(value = "photos", required = false) MultipartFile[] photos) throws IOException {

        return repository.findById(id).map(item -> {
            item.setDescription(description);

            try {
                if (photos != null) {
                    if (photos.length > 3) {
                        return ResponseEntity.badRequest().body("You can only upload up to 3 photos.");
                    }

                    List<String> filePaths = new ArrayList<>();
                    for (MultipartFile photo : photos) {
                        String fileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();
                        Path path = Paths.get(uploadDir, fileName);
                        Files.createDirectories(path.getParent());
                        Files.write(path, photo.getBytes());
                        filePaths.add(path.toString());
                    }

                    item.setPhotoPaths(filePaths);
                }
            } catch (IOException e) {
                return ResponseEntity.internalServerError().body("Failed to upload photos.");
            }

            return ResponseEntity.ok(repository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok("Item deleted");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
