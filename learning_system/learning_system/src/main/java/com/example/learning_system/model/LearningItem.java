@Entity
public class LearningItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "learning_photos", joinColumns = @JoinColumn(name = "learning_item_id"))
    @Column(name = "photo_path")
    private List<String> photoPaths = new ArrayList<>();

    // Getters and setters
}
