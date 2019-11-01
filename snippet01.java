
public void trimToSize() {
        modCount++;
        int oldCapacity = elementData.length;
        if (size < oldCapacity) {
        elementData = Arrays.copyOf(elementData, size);
        }
        }
